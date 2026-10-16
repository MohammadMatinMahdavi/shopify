
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCart } from '~/composables/useCart'

const menuOpen = ref(false)
const activeMenu = ref('')
const searchOpen = ref(false)
const searchQuery = ref('')

const user = ref(null)
const authError = ref('')
const authLoading = ref(false)

const { count } = useCart()

let authSubscription = null

const categories = [
  { title: 'کفش', subtitle: 'برای هر قدم', image: '/images/p2.jpg', href: '/products?category=shoes' },
  { title: 'کتونی', subtitle: 'راحتی در حرکت', image: '/images/p3.jpg', href: '/products?category=sneakers' },
  { title: 'کیف', subtitle: 'جزئیات ماندگار', image: '/images/p4.jpg', href: '/products?category=bags' },
  { title: 'اکسسوری', subtitle: 'امضای استایل تو', image: '/images/p5.jpg', href: '/products?category=accessories' }
]

const navLinks = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'تازه‌رسیده‌ها', href: '/products?sort=newest' },
  { label: 'درباره NOVA', href: '/about' }
]

const searchHref = computed(() => {
  const query = searchQuery.value.trim()
  return query
    ? `/products?search=${encodeURIComponent(query)}`
    : '/products'
})

onMounted(async () => {
  const { $supabase } = useNuxtApp()

  if (!$supabase) {
    authError.value = 'سرویس حساب کاربری در دسترس نیست.'
    return
  }

  // دریافت وضعیت فعلی حساب
  const { data, error } = await $supabase.auth.getUser()

  if (!error) {
    user.value = data.user
  }

  // دنبال کردن تغییرات ورود و خروج
  const { data: authListener } = $supabase.auth.onAuthStateChange(
    (_event, session) => {
      user.value = session?.user ?? null
    }
  )

  authSubscription = authListener.subscription
})

onUnmounted(() => {
  authSubscription?.unsubscribe()
})

function closeMenus() {
  activeMenu.value = ''
  menuOpen.value = false
}

async function handleSignOut() {
  if (authLoading.value) return

  authError.value = ''
  authLoading.value = true

  try {
    const { $supabase } = useNuxtApp()
    const { error } = await $supabase.auth.signOut()

    if (error) throw error

    user.value = null
    closeMenus()

    await navigateTo('/')
  } catch (error) {
    console.error('Sign out failed:', error)
    authError.value = 'خروج از حساب انجام نشد. دوباره تلاش کن.'
  } finally {
    authLoading.value = false
  }
}
</script>

<template>
  <header class="site-header" @mouseleave="activeMenu = ''">
    <div class="announcement-bar">
      <span>انتخاب‌های تازه، برای استایل متفاوت تو</span>
      <span class="announcement-divider"></span>
      <NuxtLink to="/products?sort=newest">
        کشف مجموعه جدید <span>←</span>
      </NuxtLink>
    </div>

    <div class="header-main">
      <div class="nova-container header-inner">
        <button
          class="icon-button mobile-menu-button"
          type="button"
          :aria-expanded="menuOpen"
          aria-label="باز کردن منو"
          @click="menuOpen = !menuOpen"
        >
          <svg
            v-if="!menuOpen"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>

          <svg
            v-else
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>

        <NuxtLink
          to="/"
          class="brand"
          aria-label="NOVA صفحه اصلی"
          @click="closeMenus"
        >
          NOVA<span>.</span>
          <small>OBJECTS OF STYLE</small>
        </NuxtLink>

        <nav class="desktop-nav" aria-label="منوی اصلی">
          <NuxtLink to="/" class="nav-link">خانه</NuxtLink>

          <button
            class="nav-link nav-dropdown-trigger"
            type="button"
            :aria-expanded="activeMenu === 'categories'"
            @mouseenter="activeMenu = 'categories'"
            @focus="activeMenu = 'categories'"
            @click="activeMenu = activeMenu === 'categories' ? '' : 'categories'"
          >
            دسته‌بندی‌ها
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="m3 6 5 5 5-5" />
            </svg>
          </button>

          <NuxtLink to="/products?sort=newest" class="nav-link">
            تازه‌رسیده‌ها
          </NuxtLink>

          <NuxtLink to="/about" class="nav-link">
            داستان NOVA
          </NuxtLink>
        </nav>

        <div class="header-actions">
          <button
            class="icon-button search-button"
            type="button"
            aria-label="جستجو"
            :aria-expanded="searchOpen"
            @click="searchOpen = !searchOpen; activeMenu = ''"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <circle cx="10.8" cy="10.8" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
          </button>

          <NuxtLink
            v-if="!user"
            to="/auth"
            class="account-link"
            aria-label="ورود به حساب کاربری"
          >
            ورود
          </NuxtLink>

          <button
            v-else
            class="account-link"
            type="button"
            :disabled="authLoading"
            @click="handleSignOut"
          >
            {{ authLoading ? 'در حال خروج...' : 'خروج' }}
          </button>

          <NuxtLink to="/cart" class="cart-link" aria-label="سبد خرید">
            <span class="cart-label">سبد خرید</span>

            <span class="cart-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>

              <span v-if="count > 0" class="cart-count">
                {{ count }}
              </span>
            </span>
          </NuxtLink>
        </div>
      </div>

      <p v-if="authError" class="auth-error" role="alert">
        {{ authError }}
      </p>

      <Transition name="search-panel">
        <form
          v-if="searchOpen"
          class="search-panel nova-container"
          @submit.prevent="navigateTo(searchHref)"
        >
          <input
            v-model="searchQuery"
            type="search"
            placeholder="دنبال چه چیزی می‌گردی؟"
            aria-label="جستجوی محصولات"
            autofocus
          />

          <button type="submit">
            جستجو <span>←</span>
          </button>
        </form>
      </Transition>

      <Transition name="mega-menu">
        <div
          v-if="activeMenu === 'categories'"
          class="mega-menu"
          @mouseenter="activeMenu = 'categories'"
        >
          <div class="nova-container mega-inner">
            <div class="mega-intro">
              <span class="mega-eyebrow">FIND YOUR STYLE</span>

              <h2>
                انتخابی که<br />
                <span>شبیه توست.</span>
              </h2>

              <p>
                از جزئیات کوچک تا انتخاب‌های بزرگ؛ استایل خودت را پیدا کن.
              </p>

              <NuxtLink
                to="/products"
                class="mega-all-link"
                @click="closeMenus"
              >
                مشاهده همه محصولات <span>←</span>
              </NuxtLink>
            </div>

            <NuxtLink
              v-for="(category, index) in categories"
              :key="category.title"
              :to="category.href"
              class="mega-category"
              @click="closeMenus"
            >
              <div class="mega-image">
                <img :src="category.image" :alt="category.title" />
                <span class="mega-number">0{{ index + 1 }}</span>
                <span class="mega-arrow">↗</span>
              </div>

              <div class="mega-category-copy">
                <strong>{{ category.title }}</strong>
                <span>{{ category.subtitle }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </div>

    <Transition name="mobile-menu">
      <nav
        v-if="menuOpen"
        class="mobile-nav nova-container"
        aria-label="منوی موبایل"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.label"
          :to="link.href"
          @click="closeMenus"
        >
          {{ link.label }} <span>↗</span>
        </NuxtLink>

        <NuxtLink
          v-if="!user"
          to="/auth"
          @click="closeMenus"
        >
          ورود / ثبت‌نام <span>↗</span>
        </NuxtLink>

        <button
          v-else
          class="mobile-signout"
          type="button"
          :disabled="authLoading"
          @click="handleSignOut"
        >
          {{ authLoading ? 'در حال خروج...' : 'خروج از حساب' }}
        </button>

        <div class="mobile-category-list">
          <span class="mobile-nav-label">دسته‌بندی محصولات</span>

          <NuxtLink
            v-for="category in categories"
            :key="category.title"
            :to="category.href"
            @click="closeMenus"
          >
            {{ category.title }}
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: relative;
  z-index: 50;
  background: var(--nova-bg);
}

.announcement-bar {
  min-height: 34px;
  padding: 7px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  background: var(--nova-ink);
  color: #fffefa;
  font-size: 10px;
  letter-spacing: .1px;
}

.announcement-bar a {
  color: #f2b19f;
}

.announcement-bar a span {
  display: inline-block;
  margin-right: 5px;
  transition: transform .2s ease;
}

.announcement-bar a:hover span {
  transform: translateX(-4px);
}

.announcement-divider {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--nova-accent);
}

.header-main {
  position: relative;
  background: var(--nova-bg);
  border-bottom: 1px solid var(--nova-border);
}

.header-inner {
  min-height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 0 0 auto;
  direction: ltr;
  font-family: Arial, sans-serif;
  font-size: 31px;
  font-weight: 900;
  line-height: .9;
  letter-spacing: -2px;
}

.brand > span {
  display: inline;
  color: var(--nova-accent);
}

.brand small {
  margin-top: 8px;
  font-size: 7px;
  font-weight: 500;
  letter-spacing: 2.1px;
  color: var(--nova-muted);
}

.desktop-nav,
.header-actions {
  display: flex;
  align-items: center;
}

.desktop-nav {
  align-self: stretch;
  gap: clamp(18px, 2.5vw, 38px);
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 0;
  background: transparent;
  color: #5f5b55;
  font: inherit;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
  transition: color .2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 24px;
  width: 0;
  height: 1px;
  background: var(--nova-accent);
  transition: width .25s ease;
}

.nav-link:hover,
.nav-link:focus-visible {
  color: var(--nova-ink);
}

.nav-link:hover::after,
.nav-link:focus-visible::after {
  width: 100%;
}

.nav-dropdown-trigger svg {
  width: 13px;
  height: 13px;
  transition: transform .2s ease;
}

.nav-dropdown-trigger[aria-expanded="true"] svg {
  transform: rotate(180deg);
}

.header-actions {
  gap: 17px;
}

.icon-button {
  width: 39px;
  height: 39px;
  display: grid;
  place-items: center;
  border: 1px solid transparent;
  background: transparent;
  color: var(--nova-ink);
  cursor: pointer;
  transition: background .2s ease, border-color .2s ease;
}

.icon-button:hover {
  background: var(--nova-surface);
  border-color: var(--nova-border);
}

.icon-button svg,
.cart-link svg {
  width: 21px;
  height: 21px;
}

.account-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 10px;
  border: 1px solid var(--nova-border);
  background: transparent;
  color: var(--nova-ink);
  font: inherit;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
  transition: background .2s ease, color .2s ease;
}

.account-link:hover:not(:disabled) {
  background: var(--nova-ink);
  color: white;
}

.account-link:disabled {
  opacity: .6;
  cursor: wait;
}

.auth-error {
  margin: 0;
  padding: 8px 16px;
  color: #bd342c;
  font-size: 12px;
  text-align: center;
  overflow-wrap: anywhere;
}

.cart-link {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 12px;
  white-space: nowrap;
}

.cart-icon-wrap {
  position: relative;
  display: inline-flex;
}

.cart-count {
  position: absolute;
  top: -7px;
  left: -8px;
  min-width: 17px;
  height: 17px;
  padding: 0 4px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--nova-accent);
  color: white;
  font: 10px Arial, sans-serif;
}

.mobile-menu-button,
.mobile-nav {
  display: none;
}

.mega-menu {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  z-index: 60;
  background: var(--nova-surface);
  border-bottom: 1px solid var(--nova-border);
  box-shadow: 0 24px 45px #20201e12;
}

.mega-inner {
  display: flex;
  align-items: stretch;
  gap: 22px;
  padding-top: 30px;
  padding-bottom: 34px;
}

.mega-intro {
  flex: 1.15 1 0;
  min-width: 160px;
  padding: 10px 0 0;
}

.mega-eyebrow {
  color: var(--nova-accent);
  font: 9px Arial, sans-serif;
  letter-spacing: 1.8px;
}

.mega-intro h2 {
  margin: 16px 0 12px;
  font-size: clamp(22px, 2.2vw, 31px);
  line-height: 1.7;
  font-weight: 750;
}

.mega-intro h2 span {
  color: var(--nova-accent);
}

.mega-intro p {
  max-width: 230px;
  color: var(--nova-muted);
  font-size: 11px;
  line-height: 2;
}

.mega-all-link {
  display: inline-flex;
  gap: 12px;
  margin-top: 16px;
  padding-bottom: 7px;
  border-bottom: 1px solid var(--nova-border);
  font-size: 11px;
}

.mega-all-link span {
  transition: transform .2s ease;
}

.mega-all-link:hover span {
  transform: translateX(-4px);
}

.mega-category {
  flex: 1 1 0;
  min-width: 0;
}

.mega-image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 4.8;
  background: #eee9e1;
}

.mega-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .5s ease;
}

.mega-category:hover .mega-image img {
  transform: scale(1.055);
}

.mega-number {
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  font: 10px Arial, sans-serif;
  text-shadow: 0 1px 5px #0008;
}

.mega-arrow {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  background: var(--nova-surface);
  transition: background .2s ease, color .2s ease;
}

.mega-category:hover .mega-arrow {
  background: var(--nova-accent);
  color: white;
}

.mega-category-copy {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding-top: 12px;
}

.mega-category-copy strong {
  font-size: 13px;
}

.mega-category-copy > span {
  color: var(--nova-muted);
  font-size: 9px;
}

.search-panel {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 18px;
  padding-bottom: 18px;
  border-top: 1px solid var(--nova-border);
}

.search-panel input {
  flex: 1;
  min-width: 0;
  padding: 13px 0;
  border: 0;
  border-bottom: 1px solid var(--nova-border);
  outline: none;
  background: transparent;
  color: var(--nova-ink);
  font: inherit;
  font-size: 13px;
}

.search-panel input:focus {
  border-color: var(--nova-accent);
}

.search-panel button {
  border: 0;
  background: var(--nova-ink);
  color: white;
  padding: 13px 18px;
  font: inherit;
  font-size: 11px;
  cursor: pointer;
}

.search-panel button span {
  margin-right: 8px;
}

.mobile-signout {
  width: 100%;
  padding: 14px 0;
  border: 0;
  border-top: 1px solid var(--nova-border);
  background: transparent;
  color: var(--nova-ink);
  font: inherit;
  font-size: 13px;
  text-align: right;
  cursor: pointer;
}

.mobile-signout:disabled {
  opacity: .6;
  cursor: wait;
}

.mega-menu-enter-active,
.mega-menu-leave-active,
.search-panel-enter-active,
.search-panel-leave-active {
  transition: opacity .2s ease, transform .25s ease;
}

.mega-menu-enter-from,
.mega-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.search-panel-enter-from,
.search-panel-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

@media (max-width: 900px) {
  .header-inner {
    min-height: 76px;
    gap: 15px;
  }

  .desktop-nav {
    gap: 16px;
  }

  .nav-link {
    font-size: 11px;
  }

  .brand {
    font-size: 28px;
  }

  .header-actions {
    gap: 8px;
  }

  .mega-inner {
    gap: 14px;
  }

  .mega-category-copy {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 700px) {
  .announcement-bar {
    min-height: 31px;
    font-size: 9px;
    gap: 9px;
  }

  .header-inner {
    min-height: 70px;
    gap: 8px;
  }

  .mobile-menu-button {
    display: grid;
    order: 0;
    width: 34px;
    height: 34px;
  }

  .brand {
    order: 1;
    margin-left: auto;
    margin-right: auto;
    font-size: 27px;
  }

  .desktop-nav {
    display: none;
  }

  .header-actions {
    order: 2;
    gap: 3px;
  }

  .icon-button {
    width: 34px;
    height: 34px;
  }

  .account-link {
    padding: 7px 8px;
    font-size: 11px;
  }

  .cart-label {
    display: none;
  }

  .mega-menu {
    display: none;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    padding-top: 5px;
    padding-bottom: 22px;
  }

  .mobile-nav > a {
    display: flex;
    justify-content: space-between;
    padding: 14px 0;
    border-top: 1px solid var(--nova-border);
    font-size: 13px;
  }

  .mobile-nav > a span {
    color: var(--nova-accent);
  }

  .mobile-category-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding-top: 18px;
    border-top: 1px solid var(--nova-border);
  }

  .mobile-nav-label {
    flex: 0 0 100%;
    margin-bottom: 5px;
    color: var(--nova-muted);
    font-size: 11px;
  }

  .mobile-category-list a {
    padding: 9px 13px;
    background: #efebe3;
    font-size: 11px;
  }

  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition: opacity .2s ease, transform .2s ease;
  }

  .mobile-menu-enter-from,
  .mobile-menu-leave-to {
    opacity: 0;
    transform: translateY(-7px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mega-menu-enter-active,
  .mega-menu-leave-active,
  .search-panel-enter-active,
  .search-panel-leave-active,
  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition: none;
  }
}
</style>
