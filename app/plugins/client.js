
import { createBrowserClient } from '@supabase/ssr'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  if (
    !config.public.supabaseUrl ||
    !config.public.supabasePublishableKey
  ) {
    throw new Error(
      'Supabase configuration is missing. Check your .env file.'
    )
  }

  const supabase = createBrowserClient(
    config.public.supabaseUrl,
    config.public.supabasePublishableKey
  )

  return {
    provide: {
      supabase,
    },
  }
})
