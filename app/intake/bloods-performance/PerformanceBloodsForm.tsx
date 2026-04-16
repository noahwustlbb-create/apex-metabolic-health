import BloodsPanelForm from '@/components/BloodsPanelForm'

export default function PerformanceBloodsForm() {
  return (
    <BloodsPanelForm config={{
      storageKey: 'apex-bloods-performance-v3',
      panelName: 'PERFORMANCE & RECOVERY PANEL',
      panelPrice: '$99',
      programLabel: 'Performance Optimisation',
      biomarkers: ['FBC', 'Iron Studies', 'Vit D', 'B12', 'Mg', 'Zinc', 'Cortisol', 'Total Testosterone', 'Free Testosterone', 'IGF-1', 'TSH', 'FT3', 'FT4', 'LFT', 'UEC', 'Lipids', 'Glucose', 'HbA1c', 'CK', 'hsCRP'],
    }} />
  )
}
