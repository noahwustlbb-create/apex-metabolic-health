const BASE_URL = process.env.CLINIKO_BASE_URL || 'https://api.au5.cliniko.com/v1'
const API_KEY = process.env.CLINIKO_API_KEY || ''

function authHeader(): string {
  return 'Basic ' + Buffer.from(`${API_KEY}:`).toString('base64')
}

export interface ClinikoPatientPayload {
  firstName: string
  lastName: string
  dob: string        // YYYY-MM-DD
  email: string
  phone: string
  notes?: string
}

export async function createClinikoPatient(p: ClinikoPatientPayload): Promise<{ id: string }> {
  const res = await fetch(`${BASE_URL}/patients`, {
    method: 'POST',
    headers: {
      Authorization: authHeader(),
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'ApexMetabolicHealth/1.0',
    },
    body: JSON.stringify({
      first_name: p.firstName,
      last_name: p.lastName,
      date_of_birth: p.dob,
      email: p.email,
      patient_phone_numbers: [{ number: p.phone, phone_type: 'Mobile' }],
      notes: p.notes || '',
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Cliniko error ${res.status}: ${text}`)
  }

  const data = await res.json()
  return { id: data.id }
}
