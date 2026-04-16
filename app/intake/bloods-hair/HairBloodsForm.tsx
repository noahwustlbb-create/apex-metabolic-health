import BloodsPanelForm from '@/components/BloodsPanelForm'

export default function HairSkinBloodsForm() {
  return (
    <BloodsPanelForm config={{
      storageKey: 'apex-bloods-hair-skin-v1',
      panelName: 'HAIR & SKIN RESTORATION PANEL',
      panelPrice: '$99',
      programLabel: 'Hair & Skin Restoration',
      biomarkers: [
        'Total Testosterone', 'Free Testosterone', 'DHT', 'SHBG', 'DHEA-S', 'Prolactin',
        'TSH', 'FT3', 'FT4', 'Cortisol', 'FBC', 'Ferritin', 'Iron Studies',
        'Vit D', 'B12', 'Zinc', 'LFT', 'UEC', 'Glucose', 'HbA1c', 'Lipids', 'hsCRP',
      ],
    }} />
  )
}
