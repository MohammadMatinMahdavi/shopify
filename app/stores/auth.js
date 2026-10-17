import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const initialized = ref(false)
  const loading = ref(false)
  const busy = ref(false)
  let initializingPromise = null
  let authSubscription = null

  const isAuthenticated = computed(() => Boolean(user.value))
  const displayName = computed(() => {
    const metadata = user.value?.user_metadata || {}
    return metadata.display_name?.trim()
      || metadata.full_name?.trim()
      || user.value?.email?.split('@')[0]
      || 'کاربر NOVA'
  })

  async function initialize(supabase) {
    if (initialized.value) return
    if (initializingPromise) return initializingPromise
    initializingPromise = (async () => {
      loading.value = true
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error && error.name !== 'AuthSessionMissingError') throw error
        user.value = data?.user ?? null
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
          user.value = session?.user ?? null
        })
        authSubscription = listener.subscription
        initialized.value = true
      } finally {
        loading.value = false
        initializingPromise = null
      }
    })()
    return initializingPromise
  }

  async function signIn(supabase, credentials) {
    busy.value = true
    try {
      const { data, error } = await supabase.auth.signInWithPassword(credentials)
      if (error) throw error
      user.value = data.user
      initialized.value = true
      return data
    } finally { busy.value = false }
  }

  async function signUp(supabase, { email, password, displayName: name }) {
    busy.value = true
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: name.trim() } },
      })
      if (error) throw error
      user.value = data.session ? data.user : null
      initialized.value = Boolean(data.session)
      return data
    } finally { busy.value = false }
  }

  async function signOut(supabase) {
    busy.value = true
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      user.value = null
      initialized.value = true
    } finally { busy.value = false }
  }

  async function updateDisplayName(supabase, name) {
    const normalizedName = name.trim()
    if (!normalizedName) throw new Error('نام نمایشی را وارد کن.')
    busy.value = true
    try {
      const { data, error } = await supabase.auth.updateUser({ data: { display_name: normalizedName } })
      if (error) throw error
      user.value = data.user
      return data.user
    } finally { busy.value = false }
  }

  function stopListening() {
    authSubscription?.unsubscribe()
    authSubscription = null
  }

  return {
    user, initialized, loading, busy, isAuthenticated, displayName,
    initialize, signIn, signUp, signOut, updateDisplayName, stopListening,
  }
})
