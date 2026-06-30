'use client'

import BgtEmbed from '@/components/BgtEmbed'

export default function TrtBloodsForm() {
  return (
    <BgtEmbed
      title="TRT Monitoring Panel"
      subtitle="Ongoing monitoring panel for patients on testosterone replacement therapy"
      url="https://my.bloodygoodtests.com.au/buy/a069c9d0-3f6f-4627-b998-67afb76993ad"
      biomarkers={['Total Testosterone', 'Free Testosterone', 'SHBG', 'Oestradiol (E2)', 'PSA', 'FBC', 'Haematocrit', 'Haemoglobin', 'LFT', 'UEC', 'Glucose', 'Lipids']}
    />
  )
}
