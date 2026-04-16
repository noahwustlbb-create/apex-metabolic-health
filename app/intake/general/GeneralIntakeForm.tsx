import ConsultIntakeForm from '@/components/ConsultIntakeForm'

export default function GeneralIntakeForm() {
  return (
    <ConsultIntakeForm config={{
      storageKey: 'apex-general-intake-v3',
      programName: 'General Telehealth',
      formTitle: 'GENERAL TELEHEALTH — CONSULTATION INTAKE',
      concern: 'Describe what you\'d like to discuss — symptoms, concerns, anything you want reviewed or checked...',
      bloodsHref: '/intake/bloods-hormone',
    }} />
  )
}
