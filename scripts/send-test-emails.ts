// Send the journey emails to a test inbox.
//
//   npx tsx scripts/send-test-emails.ts                    # all templates
//   npx tsx scripts/send-test-emails.ts consult-confirmed  # just these
//   TEST_TO=someone@example.com npx tsx scripts/send-test-emails.ts
//
// The secret is read from a hidden prompt, so it never lands in shell history,
// a file, or an argument list. Set EMAIL_API_SECRET in the environment instead
// if you're running this from CI.

import { templateKeys } from '../lib/email/render'
import { SAMPLE } from '../lib/email/sample'

const ENDPOINT = process.env.TEST_ENDPOINT || 'https://www.apexmetabolichealth.com.au/api/journey-email'
const TO = process.env.TEST_TO || 'admin@apexmetabolichealth.com.au'
const GAP_MS = 1500 // pace sends so Gmail SMTP doesn't rate-limit or flag us

function promptHidden(question: string): Promise<string> {
  return new Promise(resolve => {
    const stdin = process.stdin
    process.stdout.write(question)
    stdin.setRawMode?.(true)
    stdin.resume()
    stdin.setEncoding('utf8')
    let value = ''
    const onData = (chunk: string) => {
      for (const ch of chunk) {
        const code = ch.charCodeAt(0)
        if (code === 10 || code === 13 || code === 4) { // enter / EOT
          stdin.setRawMode?.(false)
          stdin.pause()
          stdin.removeListener('data', onData)
          process.stdout.write('\n')
          return resolve(value)
        }
        if (code === 3) { process.stdout.write('\n'); process.exit(130) } // ctrl-C
        if (code === 127 || code === 8) { value = value.slice(0, -1); continue } // backspace
        value += ch
      }
    }
    stdin.on('data', onData)
  })
}

async function main() {
  const requested = process.argv.slice(2)
  const all = templateKeys()
  const keys = requested.length ? requested : all

  const unknown = keys.filter(k => !all.includes(k))
  if (unknown.length) {
    console.error(`Unknown template(s): ${unknown.join(', ')}`)
    process.exit(1)
  }

  const secret = process.env.EMAIL_API_SECRET || process.env.BGT_INTERNAL_SECRET || await promptHidden('EMAIL_API_SECRET (hidden): ')
  if (!secret) { console.error('No secret provided.'); process.exit(1) }

  console.log(`\nSending ${keys.length} template(s) to ${TO}\n`)
  let sent = 0, failed = 0

  for (const [i, key] of keys.entries()) {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-apex-internal-secret': secret },
        body: JSON.stringify({ template: key, to: TO, data: SAMPLE }),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok) { sent++; console.log(`  ✓ ${key.padEnd(28)} ${json.subject ?? ''}`) }
      else { failed++; console.error(`  ✗ ${key.padEnd(28)} ${res.status} ${json.error ?? ''}`) }
    } catch (err) {
      failed++
      console.error(`  ✗ ${key.padEnd(28)} ${err instanceof Error ? err.message : String(err)}`)
    }
    if (i < keys.length - 1) await new Promise(r => setTimeout(r, GAP_MS))
  }

  console.log(`\n${sent} sent, ${failed} failed.`)
  process.exit(failed ? 1 : 0)
}

main()
