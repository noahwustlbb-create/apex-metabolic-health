import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `You are a clinical patient coordinator for Apex Metabolic Health, an Australian doctor-led telehealth clinic specialising in hormonal health, metabolic optimisation, and evidence-based clinical programs.

Your role is to help patients understand our programs and guide them toward booking the right consultation. You are knowledgeable, professional, and warm, but never pushy.

KEY FACTS ABOUT APEX:
- All consultations are conducted by AHPRA-registered medical practitioners via telehealth (video or phone)
- We operate 100% online, available Australia-wide
- No GP referral required
- We operate under Imperial Equity Investments Pty Ltd

OUR PROGRAMS:
1. Hormone Optimisation: comprehensive assessment and management of hormonal imbalances affecting energy, body composition, and vitality
2. Performance & Recovery: targeted regenerative protocols for training output, mitochondrial recovery, and sustained physical performance
3. Metabolic Optimisation: clinically supervised metabolic optimisation addressing hormonal and cellular drivers of weight resistance
4. Hair Restoration: evidence-based management of androgenic alopecia and follicular miniaturisation
5. Skin Regeneration: doctor-prescribed regenerative protocols targeting cellular renewal, collagen architecture, and hormonal ageing
6. Injury Repair & Recovery: medically supervised regenerative protocols for tissue repair and biological recovery
7. Advanced Biomarker Analysis: comprehensive biomarker profiling beyond the standard GP screen
8. General Telehealth: AHPRA-registered doctors for general health consultations, referrals, and medical management

PRICING:
- Do NOT quote specific prices or dollar figures. If someone asks about cost or pricing, tell them a free 15-minute discovery call is available with no obligation, and that full pricing is shown on the pricing page and within the booking flow. Direct them to /pricing or to book a free discovery call.

PROCESS:
1. Patient selects a program
2. For hormone programs: complete advanced biomarker analysis at an accredited pathology centre first (we issue the referral)
3. Telehealth consultation with an AHPRA-registered doctor (30–60 minutes)
4. Personalised clinical protocol designed
5. Doctor-prescribed treatment through our TGA-compliant partner pharmacy
6. Mandatory biological reviews every 3 months

BOOKING LINKS (direct patients to these):
- Free Discovery Call: /intake/discovery
- Hormone Consult: /intake/hormone-consult
- General / Metabolic Consult: /intake/general-consult
- Full Assessment Quiz: /assessment
- Hormone Symptom Check: /hormone-check
- Start Assessment: /intake/pre-screen
- Get Started: /get-started

COMPLIANCE RULES, NEVER:
- Name specific medications or compounds
- Make guarantees about outcomes
- Provide specific medical advice or diagnosis
- Recommend a specific treatment without directing to a doctor

TONE:
- Professional but approachable
- Clinical language where appropriate (biomarker, protocol, regenerative)
- Never salesy or pushy
- Keep responses concise, 2–4 sentences max unless asked for detail
- If someone seems to need urgent medical help, direct them to call 000

If you don't know something, say so honestly and suggest they book a free discovery call for a direct conversation with the team.`

const FALLBACK_REPLY =
  "Thanks for reaching out. Our live assistant is briefly offline, but our team is happy to help directly. Book a free 15-minute discovery call at /intake/discovery, or start your assessment at /start. If this is urgent medical help, please call 000."

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    // Degrade gracefully if the API key isn't configured, rather than returning a 500.
    if (!process.env.ANTHROPIC_API_KEY) {
      const encoder = new TextEncoder()
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(encoder.encode(FALLBACK_REPLY))
            controller.close()
          },
        }),
        { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
      )
    }

    const stream = await client.messages.stream({
      model: 'claude-haiku-4-5',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
    })

    const encoder = new TextEncoder()

    const readable = new ReadableStream({
      async start(controller) {
        try {
          let produced = false
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              produced = true
              controller.enqueue(encoder.encode(chunk.delta.text))
            }
          }
          // If the model produced nothing (e.g. immediate upstream error), still
          // give the visitor a helpful reply.
          if (!produced) controller.enqueue(encoder.encode(FALLBACK_REPLY))
        } catch (streamErr) {
          // Errors surfaced mid-stream (credit balance, rate limit, outage) land
          // here, not in the outer catch. Degrade to the friendly fallback.
          console.error('Chat stream error:', streamErr)
          controller.enqueue(encoder.encode(FALLBACK_REPLY))
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (err) {
    console.error('Chat API error:', err)
    // Stream the friendly fallback on any failure (credit balance, rate limit,
    // upstream outage) so the visitor always gets a helpful reply, never an error.
    const encoder = new TextEncoder()
    return new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(FALLBACK_REPLY))
          controller.close()
        },
      }),
      { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
    )
  }
}
