import Script from 'next/script'

// GoHighLevel live chat widget (Sites -> Chat Widget -> "Apex Website Live Chat").
// Conversations land in the GHL inbox for the Apex sub-account. Replaces the
// previous Claude-powered ChatWidget, which needed prepaid API credits.
const WIDGET_ID = '6aa903bc9fb146dfd072efa4'

export default function GhlChatWidget() {
  return (
    <Script
      id="ghl-chat-widget"
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id={WIDGET_ID}
      strategy="lazyOnload"
    />
  )
}
