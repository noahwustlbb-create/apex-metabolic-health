import BloodsPanelForm from '@/components/BloodsPanelForm'

export default function InjuryBloodsForm() {
  return (
    <BloodsPanelForm config={{
      storageKey: 'apex-bloods-injury-v3',
      panelName: 'INJURY REPAIR & RECOVERY PANEL',
      panelPrice: '$99',
      programLabel: 'Injury Repair & Recovery',
      biomarkers: ['FBC', 'LFT', 'UEC', 'Cortisol', 'Total Testosterone', 'IGF-1', 'Vit D', 'Mg', 'Ca', 'Phosphate', 'Iron Studies', 'hsCRP', 'ESR', 'Glucose', 'HbA1c', 'Lipids', 'CK'],
    }} />
  )
}
