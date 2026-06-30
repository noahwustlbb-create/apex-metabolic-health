'use client'

import BgtEmbed from '@/components/BgtEmbed'

export default function HormoneBloodsForm() {
  return (
    <BgtEmbed
      title="Hormone Health Panel"
      subtitle="Comprehensive pre-TRT hormone assessment ordered by our doctors"
      url="https://my.bloodygoodtests.com.au/buy/8db67cec-81c9-4c51-a66a-ddf4ce8278f2"
      biomarkers={['Total Testosterone', 'Free Testosterone', 'SHBG', 'LH', 'FSH', 'Oestradiol (E2)', 'DHEA-S', 'Prolactin', 'PSA', 'FBC', 'Thyroid (TSH)', 'Cortisol', 'Lipids', 'Glucose', 'LFT', 'UEC']}
    />
  )
}
