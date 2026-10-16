
<script setup>
import { ref } from 'vue'

const mode = ref('login')
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const isLogin = computed(() => mode.value === 'login')

function changeMode(newMode) {
  mode.value = newMode
  errorMessage.value = ''
  successMessage.value = ''
}

async function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''

  const normalizedEmail = email.value.trim()

  if (!normalizedEmail || !password.value) {
    errorMessage.value = 'ایمیل و رمز عبور را وارد کن.'
    return
  }

  loading.value = true

  try {
    const { $supabase } = useNuxtApp()

    if (isLogin.value) {
      const { error } = await $supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: password.value,
      })

      if (error) throw error

      await navigateTo('/')
      return
    }

    const { data, error } = await $supabase.auth.signUp({
      email: normalizedEmail,
      password: password.value,
    })

    if (error) throw error

    if (data.session) {
      successMessage.value = 'حساب ساخته شد؛ در حال انتقال...'
      await navigateTo('/')
      return
    }

    successMessage.value =
      'ثبت‌نام انجام شد. اگر تأیید ایمیل فعال است، ایمیلت را بررسی کن.'
  } catch (error) {
    errorMessage.value =
      error?.message || 'عملیات انجام نشد. دوباره تلاش کن.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="auth-page" dir="rtl">
    <NuxtLink to="/" class="brand">NOVA<span>.</span></NuxtLink>

    <section class="auth-card">
      <p class="eyebrow">به دنیای NOVA خوش آمدی</p>

      <h1>{{ isLogin ? 'خوش برگشتی!' : 'حساب جدید بساز' }}</h1>

      <p class="subtitle">
        {{
          isLogin
            ? 'برای ادامه وارد حساب کاربری‌ات شو.'
            : 'به خانواده NOVA بپیوند.'
        }}
      </p>

      <div class="mode-switch">
        <button
          type="button"
          :class="{ active: isLogin }"
          @click="changeMode('login')"
        >
          ورود
        </button>

        <button
          type="button"
          :class="{ active: !isLogin }"
          @click="changeMode('signup')"
        >
          ثبت‌نام
        </button>
      </div>

      <form @submit.prevent="handleSubmit">
        <label for="email">ایمیل</label>
        <input
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          placeholder="you@example.com"
          required
        />

        <label for="password">رمز عبور</label>
        <input
          id="password"
          v-model="password"
          type="password"
          :autocomplete="isLogin ? 'current-password' : 'new-password'"
          placeholder="رمز عبورت را وارد کن"
          minlength="6"
          required
        />

        <p v-if="errorMessage" class="feedback error" role="alert">
          {{ errorMessage }}
        </p>

        <p v-if="successMessage" class="feedback success" role="status">
          {{ successMessage }}
        </p>

        <button class="submit-button" type="submit" :disabled="loading">
          {{
            loading
              ? 'لطفاً صبر کن...'
              : isLogin
                ? 'ورود به حساب'
                : 'ساخت حساب کاربری'
          }}
        </button>
      </form>

      <p class="legal-note">
        با استفاده از NOVA، اطلاعات حساب خود را مسئولانه نگهداری کن.
      </p>
    </section>
  </main>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  padding: 32px 20px 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f5f0;
  color: #20201e;
}

.brand {
  margin-bottom: 36px;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: 2px;
}

.brand span {
  color: #e65b3f;
}

.auth-card {
  width: 100%;
  max-width: 440px;
  padding: 36px;
  border: 1px solid #e7e3db;
  border-radius: 22px;
  background: #fffefa;
  box-shadow: 0 18px 55px rgb(32 32 30 / 6%);
}

.eyebrow {
  color: #e65b3f;
  font-size: 13px;
  font-weight: 700;
}

h1 {
  margin: 12px 0;
  font-size: 30px;
  font-weight: 800;
}

.subtitle {
  margin-bottom: 26px;
  color: #77756f;
  line-height: 1.9;
  font-size: 14px;
}

.mode-switch {
  display: flex;
  gap: 8px;
  padding: 5px;
  margin-bottom: 26px;
  border-radius: 12px;
  background: #f1eee7;
}

.mode-switch button {
  flex: 1;
  padding: 11px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  cursor: pointer;
}

.mode-switch button.active {
  background: white;
  box-shadow: 0 2px 8px rgb(0 0 0 / 5%);
  font-weight: 700;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 700;
}

input {
  width: 100%;
  padding: 13px 14px;
  margin-bottom: 20px;
  border: 1px solid #dedad1;
  border-radius: 10px;
  outline: none;
  background: white;
  font: inherit;
}

input:focus {
  border-color: #e65b3f;
  box-shadow: 0 0 0 3px rgb(230 91 63 / 10%);
}

.submit-button {
  padding: 14px;
  border: 0;
  border-radius: 10px;
  background: #20201e;
  color: white;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: background 180ms ease;
}

.submit-button:hover {
  background: #e65b3f;
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: wait;
}

.feedback {
  margin: 0 0 16px;
  font-size: 13px;
  line-height: 1.8;
  overflow-wrap: anywhere;
}

.error {
  color: #bd342c;
}

.success {
  color: #247746;
}

.legal-note {
  margin: 24px 0 0;
  color: #77756f;
  font-size: 12px;
  line-height: 1.9;
  text-align: center;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 26px 20px;
  }

  h1 {
    font-size: 26px;
  }
}
</style>
