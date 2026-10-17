<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const { displayName, user, busy } = storeToRefs(authStore)
const nameInput = ref('')
const message = ref('')
const errorMessage = ref('')

onMounted(async () => {
  const { $supabase } = useNuxtApp()
  await authStore.initialize($supabase)
  if (!authStore.isAuthenticated) { await navigateTo('/auth'); return }
  nameInput.value = authStore.displayName
})

async function saveProfile() {
  message.value = ''
  errorMessage.value = ''
  try {
    const { $supabase } = useNuxtApp()
    await authStore.updateDisplayName($supabase, nameInput.value)
    message.value = 'نام نمایشی با موفقیت به‌روزرسانی شد.'
  } catch (error) {
    errorMessage.value = error?.message || 'ذخیره تغییرات انجام نشد.'
  }
}
</script>

<template>
  <main class="account-page" dir="rtl"><div class="account-container">
    <NuxtLink to="/" class="account-back">← بازگشت به فروشگاه</NuxtLink>
    <section v-if="authStore.isAuthenticated" class="profile-card">
      <div class="profile-heading"><span class="profile-avatar">{{ displayName.slice(0,1) }}</span><div><span class="profile-eyebrow">NOVA ACCOUNT</span><h1>پروفایل من</h1><p>اطلاعاتی که در حساب کاربری‌ات نمایش داده می‌شود.</p></div></div>
      <form @submit.prevent="saveProfile">
        <label for="profile-name">نام نمایشی</label><input id="profile-name" v-model="nameInput" maxlength="60" required />
        <label for="profile-email">ایمیل حساب</label><input id="profile-email" :value="user?.email||''" type="email" disabled />
        <p v-if="message" class="feedback success" role="status">{{ message }}</p><p v-if="errorMessage" class="feedback error" role="alert">{{ errorMessage }}</p>
        <button type="submit" :disabled="busy">{{ busy?'در حال ذخیره...':'ذخیره تغییرات' }} <span>←</span></button>
      </form>
    </section>
  </div></main>
</template>

<style scoped>
.account-page { min-height:100vh; padding:42px 20px 80px; background:radial-gradient(ellipse at top right,#f4e4d9 0,transparent 38%),var(--nova-bg); }
.account-container { width:min(760px,100%); margin-inline:auto; }
.account-back { display:inline-flex; gap:10px; margin-bottom:26px; color:var(--nova-muted); font-size:12px; }
.account-back:hover { color:var(--nova-accent); }
.profile-card { padding:clamp(24px,5vw,44px); border:1px solid var(--nova-border); border-radius:var(--nova-radius-xl); background:rgb(255 254 250 / 94%); box-shadow:var(--nova-shadow-soft); }
.profile-heading { display:flex; align-items:center; gap:18px; padding-bottom:28px; border-bottom:1px solid var(--nova-border); margin-bottom:28px; }
.profile-avatar { width:64px; height:64px; display:grid; place-items:center; border-radius:22px; background:var(--nova-accent-soft); color:var(--nova-accent); font-size:25px; font-weight:800; }
.profile-eyebrow { color:var(--nova-accent); font:9px Arial,sans-serif; letter-spacing:1.7px; }
h1 { margin:7px 0 4px; font-size:clamp(26px,4vw,34px); }
.profile-heading p { margin:0; color:var(--nova-muted); font-size:12px; line-height:2; }
form { display:flex; flex-direction:column; } label { margin-bottom:8px; font-size:12px; font-weight:700; }
input { width:100%; margin-bottom:20px; padding:14px 15px; border:1px solid var(--nova-border); border-radius:13px; background:white; color:var(--nova-ink); font:inherit; font-size:13px; }
input:focus { border-color:var(--nova-accent); outline:2px solid #d95d4316; } input:disabled { color:var(--nova-muted); background:var(--nova-surface-soft); }
button { min-height:48px; display:flex; justify-content:space-between; align-items:center; padding:0 18px; border:0; border-radius:14px; background:var(--nova-ink); color:white; font:inherit; font-size:12px; cursor:pointer; }
button:hover:not(:disabled) { background:var(--nova-accent); } button:disabled { opacity:.6; cursor:wait; }
.feedback { margin:0 0 14px; font-size:12px; line-height:1.8; overflow-wrap:anywhere; } .success { color:#247746; } .error { color:#bd342c; }
</style>
