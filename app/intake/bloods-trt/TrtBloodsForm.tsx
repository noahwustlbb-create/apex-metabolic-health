import BloodsPanelForm from '@/components/BloodsPanelForm'

export default function TrtBloodsForm() {
  return (
    <BloodsPanelForm config={{
      storageKey: 'apex-bloods-trt-v1',
      panelName: 'TRT MONITORING PANEL',
      panelPrice: '$79',
      programLabel: 'Hormone Optimisation (TRT)',
      biomarkers: ['Total Testosterone', 'Free Testosterone', 'SHBG', 'Oestradiol (E2)', 'PSA', 'FBC', 'Haematocrit', 'Haemoglobin', 'LFT', 'UEC', 'Glucose', 'Lipids'],
      accent: 'teal',
    }} />
  )
}
