import ConsultIntakeForm from '@/components/ConsultIntakeForm'

export default function HormoneIntakeForm() {
  return (
    <ConsultIntakeForm config={{
      storageKey: 'apex-hormone-intake-v3',
      programName: 'Hormone Optimisation',
      formTitle: 'HORMONE OPTIMISATION — CONSULTATION INTAKE',
      concern: 'Describe your symptoms — low energy, reduced drive, weight gain, poor sleep, mood changes, etc. How long has this been going on?',
      bloodsHref: '/intake/bloods-hormone',
    }} />
  )
}
