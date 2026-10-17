<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const mode = ref('login')
const displayName = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLogin = computed(() => mode.value === 'login')
const loading = computed(() => authStore.busy)

function changeMode(nextMode) {
  mode.value = nextMode
  errorMessage.value = ''
  successMessage.value = ''
}

async function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''
  const normalizedEmail = email.value.trim()

  if (!normalizedEmail || !password.value || (!isLogin.value && !displayName.value.trim())) {
    errorMessage.value = 'نام نمایشی، ایمیل و رمز عبور را کامل وارد کن.'
    return
  }

  try {
    const { $supabase } = useNuxtApp()
    if (isLogin.value) {
      await authStore.signIn($supabase, { email: normalizedEmail, password: password.value })
      await navigateTo('/')
      return
    }

    const data = await authStore.signUp($supabase, {
      email: normalizedEmail, password: password.value, displayName: displayName.value,
    })
    if (data.session) {
      await navigateTo('/')
      return
    }
    successMessage.value = 'ثبت‌نام انجام شد. برای فعال‌سازی حساب، ایمیلت را بررسی کن.'
  } catch (error) {
    errorMessage.value = error?.message || 'عملیات انجام نشد. دوباره تلاش کن.'
  }
}
</script>

<template>
  <main class="auth-page" dir="rtl">
    <NuxtLink to="/" class="brand">NOVA<span>.</span><small>OBJECTS OF STYLE</small></NuxtLink>
    <section class="auth-card">
      <span class="eyebrow">به دنیای NOVA خوش آمدی</span>
      <h1>{{ isLogin ? 'خوش برگشتی!' : 'حساب خودت را بساز' }}</h1>
      <p class="subtitle">{{ isLogin ? 'برای ادامه وارد حساب کاربری‌ات شو.' : 'یک قدم نزدیک‌تر به استایل خودت.' }}</p>

      <div class="mode-switch">
        <button type="button" :class="{ active:isLogin }" @click="changeMode('login')">ورود</button>
        <button type="button" :class="{ active:!isLogin }" @click="changeMode('signup')">ثبت‌نام</button>
      </div>

      <form @submit.prevent="handleSubmit">
        <template v-if="!isLogin">
          <label for="displayName">نام نمایشی</label>
          <input id="displayName" v-model="displayName" type="text" autocomplete="name" maxlength="60" placeholder="مثلاً متین" required />
        </template>
        <label for="email">ایمیل</label>
        <input id="email" v-model="email" type="email" autocomplete="email" placeholder="you@example.com" required />
        <label for="password">رمز عبور</label>
        <input id="password" v-model="password" type="password" :autocomplete="isLogin ? 'current-password' : 'new-password'" minlength="6" placeholder="حداقل ۶ کاراکتر" required />
        <p v-if="errorMessage" class="feedback error" role="alert">{{ errorMessage }}</p>
        <p v-if="successMessage" class="feedback success" role="status">{{ successMessage }}</p>
        <button class="submit-button" type="submit" :disabled="loading">
          {{ loading ? 'لطفاً صبر کن...' : isLogin ? 'ورود به حساب' : 'ساخت حساب کاربری' }} <span>←</span>
        </button>
      </form>
      <p class="legal-note">اطلاعات حساب تو با دقت نگهداری می‌شود.</p>
    </section>
  </main>
</template>

<style scoped>
.auth-page { min-height:100vh; padding:34px 20px 60px; display:flex; flex-direction:column; align-items:center; background:radial-gradient(ellipse at 80% 5%,#f1ded2 0,transparent 38%),var(--nova-bg); color:var(--nova-ink); }
.brand { display:flex; flex-direction:column; margin-bottom:34px; direction:ltr; font:900 32px/.9 Arial,sans-serif; letter-spacing:-2px; }
.brand > span { display:inline; color:var(--nova-accent); }
.brand small { margin-top:8px; color:var(--nova-muted); font:7px Arial,sans-serif; letter-spacing:2px; }
.auth-card { width:100%; max-width:460px; padding:clamp(25px,5vw,42px); border:1px solid #e7e3db; border-radius:var(--nova-radius-xl); background:rgb(255 254 250 / 94%); box-shadow:var(--nova-shadow-soft); }
.eyebrow { color:var(--nova-accent); font-size:12px; font-weight:700; }
h1 { margin:13px 0 8px; font-size:clamp(27px,5vw,34px); font-weight:800; }
.subtitle { margin:0 0 25px; color:var(--nova-muted); font-size:13px; line-height:2; }
.mode-switch { display:flex; gap:7px; padding:5px; margin-bottom:25px; border-radius:14px; background:var(--nova-surface-soft); }
.mode-switch button { flex:1; padding:11px; border:0; border-radius:10px; background:transparent; color:var(--nova-muted); cursor:pointer; }
.mode-switch button.active { background:white; color:var(--nova-ink); box-shadow:0 3px 12px #20201e0b; font-weight:700; }
form { display:flex; flex-direction:column; }
label { margin:0 0 8px; font-size:12px; font-weight:700; }
input { width:100%; margin-bottom:18px; padding:14px 15px; border:1px solid var(--nova-border); border-radius:13px; background:white; outline:none; font:inherit; font-size:13px; transition:border-color .2s,box-shadow .2s; }
input:focus { border-color:var(--nova-accent); box-shadow:0 0 0 4px #d95d4316; }
.submit-button { display:flex; align-items:center; justify-content:space-between; min-height:50px; padding:0 17px; border:0; border-radius:14px; background:var(--nova-ink); color:white; font:inherit; font-size:12px; cursor:pointer; transition:background .2s,transform .2s; }
.submit-button:hover:not(:disabled) { background:var(--nova-accent); transform:translateY(-1px); }
.submit-button:disabled { opacity:.6; cursor:wait; }
.feedback { margin:0 0 13px; font-size:12px; line-height:1.8; overflow-wrap:anywhere; }
.error { color:#bd342c; } .success { color:#247746; }
.legal-note { margin:23px 0 0; color:var(--nova-muted); font-size:11px; text-align:center; }
</style>
