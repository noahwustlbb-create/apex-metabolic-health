import BloodsPanelForm from '@/components/BloodsPanelForm'

export default function HormoneBloodsForm() {
  return (
    <BloodsPanelForm config={{
      storageKey: 'apex-bloods-hormone-v3',
      panelName: 'HORMONE HEALTH PANEL',
      panelPrice: '$99',
      programLabel: 'Hormone Optimisation',
      biomarkers: ['Total Testosterone', 'Free Testosterone', 'SHBG', 'LH', 'FSH', 'Oestradiol', 'DHEA-S', 'Prolactin', 'TSH', 'FT3', 'FT4', 'Cortisol', 'FBC', 'Iron Studies', 'Vit D', 'B12', 'Lipids', 'Glucose', 'HbA1c', 'LFT', 'UEC', 'hsCRP', 'PSA'],
    }} />
  )
}
