import posthog from 'posthog-js'
import { POSTHOG_KEY, sanitizeUrl } from '@/lib/analytics'
import { startAttribution } from '@/lib/attribution'

const URL_PROPS = ['$current_url', '$referrer', '$initial_current_url', '$initial_referrer', '$prev_pageview_pathname']

if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
  posthog.init(POSTHOG_KEY, {
    api_host: '/ingest',
    ui_host: 'https://us.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: 'history_change',
    capture_pageleave: true,
    capture_exceptions: true,
    respect_dnt: true,
    // Autocapture keeps element types, classes and hrefs, never visible text.
    mask_all_text: true,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '*',
      blockSelector: '[data-ph-block]',
      recordHeaders: false,
      recordBody: false,
    },
    before_send: (event) => {
      if (!event) return event
      for (const key of URL_PROPS) {
        if (event.properties?.[key] !== undefined) event.properties[key] = sanitizeUrl(event.properties[key])
      }
      if (event.$set) for (const key of URL_PROPS) if (event.$set[key] !== undefined) event.$set[key] = sanitizeUrl(event.$set[key])
      return event
    },
    loaded: (ph) => ph.register({ app: 'site' }),
  })
}

// Ad attribution. Runs regardless of PostHog (and on localhost), because the
// click id has to reach the portal whether or not product analytics is on.
if (typeof window !== 'undefined') startAttribution()
