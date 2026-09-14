import 'server-only'

const HIGHLEVEL_API_BASE = 'https://services.leadconnectorhq.com'
const HIGHLEVEL_API_VERSION = 'v3'
const REQUEST_TIMEOUT_MS = 8_000

export interface MarketingLead {
  name?: string
  email: string
  phone?: string
  source: string
  program?: string
  marketingConsent?: boolean
}

interface HighLevelConfig {
  token: string
  locationId: string
  pipelineId: string
  newEnquiryStageId: string
  programInterestFieldId: string
}

interface ContactUpsertResponse {
  contact?: { id?: string }
}

interface OpportunitySearchResponse {
  opportunities?: Array<{
    id?: string
    contactId?: string
    pipelineId?: string
  }>
}

function cleanText(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') return undefined

  const cleaned = value
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return cleaned ? cleaned.slice(0, maxLength) : undefined
}

export function sanitizeMarketingLead(input: unknown): MarketingLead | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null

  const candidate = input as Record<string, unknown>
  const email = cleanText(candidate.email, 254)?.toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null

  return {
    email,
    name: cleanText(candidate.name, 120),
    phone: cleanText(candidate.phone, 40),
    source: cleanText(candidate.source, 75) ?? 'website',
    program: cleanText(candidate.program, 120),
    marketingConsent: candidate.marketingConsent === true,
  }
}

function getConfig(): HighLevelConfig {
  const config = {
    token: process.env.GHL_PRIVATE_INTEGRATION_TOKEN?.trim(),
    locationId: process.env.GHL_LOCATION_ID?.trim(),
    pipelineId: process.env.GHL_PIPELINE_ID?.trim(),
    newEnquiryStageId: process.env.GHL_NEW_ENQUIRY_STAGE_ID?.trim(),
    programInterestFieldId: process.env.GHL_PROGRAM_INTEREST_FIELD_ID?.trim(),
  }

  if (
    !config.token ||
    !config.locationId ||
    !config.pipelineId ||
    !config.newEnquiryStageId ||
    !config.programInterestFieldId
  ) {
    throw new Error('HighLevel integration is not configured')
  }

  return config as HighLevelConfig
}

function programTag(program?: string): string | undefined {
  if (!program) return undefined

  const value = program.toLowerCase()
  if (value.includes('hormone') || value.includes('trt')) {
    return 'program-hormone-optimisation'
  }
  if (value.includes('injury')) return 'program-injury-recovery'
  if (value.includes('performance') || value.includes('recovery')) {
    return 'program-performance-recovery'
  }
  if (value.includes('metabolic') || value.includes('weight')) {
    return 'program-metabolic-weight-loss'
  }
  if (value.includes('hair')) return 'program-hair-restoration'
  if (value.includes('skin')) return 'program-skin-regeneration'
  if (value.includes('sexual')) return 'program-sexual-health'
  if (value.includes('longevity') || value.includes('peptide')) return 'program-longevity'
  if (value.includes('pathology') || value.includes('blood') || value.includes('panel')) {
    return 'program-pathology'
  }

  return undefined
}

async function highLevelRequest<T>(
  config: HighLevelConfig,
  path: string,
  init: RequestInit,
): Promise<T> {
  const response = await fetch(`${HIGHLEVEL_API_BASE}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${config.token}`,
      Version: HIGHLEVEL_API_VERSION,
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })

  if (!response.ok) {
    // Do not include the response body: vendor errors can echo submitted PII.
    throw new Error(`HighLevel API ${response.status} at ${path}`)
  }

  return response.json() as Promise<T>
}

async function upsertContact(config: HighLevelConfig, lead: MarketingLead): Promise<string> {
  const result = await highLevelRequest<ContactUpsertResponse>(config, '/contacts/upsert', {
    method: 'POST',
    body: JSON.stringify({
      locationId: config.locationId,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      source: `Website: ${lead.source}`,
      country: 'AU',
      ...(lead.program
        ? {
            customFields: [
              {
                id: config.programInterestFieldId,
                fieldValue: lead.program,
              },
            ],
          }
        : {}),
      createNewIfDuplicateAllowed: false,
    }),
  })

  const contactId = result.contact?.id
  if (!contactId) throw new Error('HighLevel contact upsert returned no contact ID')
  return contactId
}

async function addRoutingTags(
  config: HighLevelConfig,
  contactId: string,
  lead: MarketingLead,
): Promise<void> {
  const tags = ['source-website']
  if (lead.marketingConsent) tags.push('marketing-consent')
  const serviceTag = programTag(lead.program)
  if (serviceTag) tags.push(serviceTag)

  // Use the additive endpoint so a repeat enquiry never removes staff-applied
  // labels or tags created by other automations.
  await highLevelRequest(config, `/contacts/${contactId}/tags`, {
    method: 'POST',
    body: JSON.stringify({ tags }),
  })
}

async function findExistingOpportunity(
  config: HighLevelConfig,
  contactId: string,
): Promise<string | undefined> {
  const query = new URLSearchParams({
    locationId: config.locationId,
    pipelineId: config.pipelineId,
    contactId,
    status: 'all',
    limit: '1',
    page: '1',
    getTasks: 'false',
    getNotes: 'false',
    getCalendarEvents: 'false',
  })

  const result = await highLevelRequest<OpportunitySearchResponse>(
    config,
    `/opportunities/search?${query.toString()}`,
    { method: 'GET' },
  )

  return result.opportunities?.find(
    opportunity =>
      opportunity.contactId === contactId && opportunity.pipelineId === config.pipelineId,
  )?.id
}

async function createOpportunity(
  config: HighLevelConfig,
  lead: MarketingLead,
  contactId: string,
): Promise<void> {
  const displayName = lead.name ?? lead.email
  const context = lead.program ?? 'Website enquiry'

  await highLevelRequest(config, '/opportunities/', {
    method: 'POST',
    body: JSON.stringify({
      pipelineId: config.pipelineId,
      locationId: config.locationId,
      pipelineStageId: config.newEnquiryStageId,
      contactId,
      name: `${displayName} — ${context}`.slice(0, 160),
      status: 'open',
    }),
  })
}

/**
 * Sends marketing identity/contact data to HighLevel. The caller must pass a
 * sanitized MarketingLead; clinical questionnaire answers are intentionally
 * not represented by this type and are never included in the API payloads.
 */
export async function submitMarketingLeadToHighLevel(lead: MarketingLead): Promise<void> {
  const config = getConfig()
  const contactId = await upsertContact(config, lead)
  await addRoutingTags(config, contactId, lead)

  if (await findExistingOpportunity(config, contactId)) return

  try {
    await createOpportunity(config, lead, contactId)
  } catch (error) {
    // A repeated form submission can race between the search and create calls.
    // Treat it as delivered if the other request created the opportunity.
    if (await findExistingOpportunity(config, contactId)) return
    throw error
  }
}

/**
 * Honour an unsubscribe: mark the contact Do Not Disturb for email and SMS
 * marketing, tag it, and remove the marketing-consent tag. Creates the contact
 * if it doesn't exist so the suppression is on record before any future import.
 */
export async function unsubscribeInHighLevel(emailInput: string): Promise<void> {
  const email = cleanText(emailInput, 254)?.toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email')

  const config = getConfig()
  const result = await highLevelRequest<ContactUpsertResponse>(config, '/contacts/upsert', {
    method: 'POST',
    body: JSON.stringify({
      locationId: config.locationId,
      email,
      dnd: true,
      dndSettings: {
        Email: { status: 'active', message: 'Unsubscribed via website' },
        SMS: { status: 'active', message: 'Unsubscribed via website' },
      },
      createNewIfDuplicateAllowed: false,
    }),
  })
  const contactId = result.contact?.id
  if (!contactId) throw new Error('HighLevel contact upsert returned no contact ID')

  await highLevelRequest(config, `/contacts/${contactId}/tags`, {
    method: 'POST',
    body: JSON.stringify({ tags: ['unsubscribed'] }),
  })
  await highLevelRequest(config, `/contacts/${contactId}/tags`, {
    method: 'DELETE',
    body: JSON.stringify({ tags: ['marketing-consent'] }),
  })
}
