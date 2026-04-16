import BloodsPanelForm from '@/components/BloodsPanelForm'

export default function MetabolicBloodsForm() {
  return (
    <BloodsPanelForm config={{
      storageKey: 'apex-bloods-metabolic-v3',
      panelName: 'METABOLIC HEALTH PANEL',
      panelPrice: '$99',
      programLabel: 'Metabolic & Weight Management',
      biomarkers: ['FBC', 'Glucose', 'HbA1c', 'Fasting Insulin', 'HOMA-IR', 'Lipids', 'LFT', 'UEC', 'TSH', 'FT3', 'FT4', 'Cortisol', 'Testosterone', 'SHBG', 'Iron Studies', 'Ferritin', 'Vit D', 'B12', 'Mg', 'Zinc', 'hsCRP', 'Uric Acid'],
    }} />
  )
}
