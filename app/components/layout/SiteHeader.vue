<script setup>
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCart } from '~/composables/useCart'
import { useAuthStore } from '~/stores/auth'
import { novaCategories } from '~/data/categories'
import CartDrawer from '~/components/cart/CartDrawer.vue'
import HeaderAnnouncement from './header/HeaderAnnouncement.vue'
import HeaderBrand from './header/HeaderBrand.vue'
import HeaderNavigation from './header/HeaderNavigation.vue'
import HeaderActions from './header/HeaderActions.vue'
import HeaderSearch from './header/HeaderSearch.vue'
import HeaderMegaMenu from './header/HeaderMegaMenu.vue'
import HeaderMobileMenu from './header/HeaderMobileMenu.vue'

const mobileMenuOpen = ref(false)
const activeMenu = ref('')
const searchOpen = ref(false)
const searchQuery = ref('')
const authError = ref('')

const authStore = useAuthStore()
const { user, displayName, busy: authLoading } = storeToRefs(authStore)
const { count, openAuthPrompt } = useCart()
const categories = novaCategories

const searchHref = computed(() => {
  const query = searchQuery.value.trim()
  return query ? `/products?search=${encodeURIComponent(query)}` : '/products'
})

onMounted(async () => {
  const { $supabase } = useNuxtApp()
  if (!$supabase) {
    authError.value = 'سرویس حساب کاربری در دسترس نیست.'
    return
  }

  try {
    await authStore.initialize($supabase)
  } catch (error) {
    console.error('Auth initialization failed:', error)
    authError.value = 'وضعیت حساب کاربری دریافت نشد.'
  }
})

function closeMenus() {
  mobileMenuOpen.value = false
  activeMenu.value = ''
}

function openCategories() {
  activeMenu.value = 'categories'
}

function toggleCategories() {
  activeMenu.value = activeMenu.value === 'categories' ? '' : 'categories'
}

function toggleSearch() {
  searchOpen.value = !searchOpen.value
  activeMenu.value = ''
}

async function submitSearch() {
  searchOpen.value = false
  await navigateTo(searchHref.value)
}

async function handleSignOut() {
  if (authLoading.value) return

  authError.value = ''
  try {
    const { $supabase } = useNuxtApp()
    await authStore.signOut($supabase)
    closeMenus()
    await navigateTo('/')
  } catch (error) {
    console.error('Sign out failed:', error)
    authError.value = 'خروج از حساب انجام نشد. دوباره تلاش کن.'
  }
}
</script>

<template>
  <header
    class="sticky top-0 z-[100] bg-[var(--nova-bg)]"
    @mouseleave="activeMenu = ''"
  >
    <HeaderAnnouncement />

    <div class="relative border-b border-[var(--nova-border)] bg-[var(--nova-bg)]">
      <div class="mx-auto flex min-h-[88px] w-full max-w-[1440px] items-center justify-between gap-[30px] px-5 sm:px-8 lg:px-10 max-[900px]:min-h-[76px] max-[900px]:gap-[15px] max-[700px]:min-h-[70px] max-[700px]:gap-2">
        <button
          type="button"
          aria-label="باز کردن منو"
          :aria-expanded="mobileMenuOpen"
          class="hidden size-[34px] shrink-0 place-items-center border border-transparent bg-transparent text-[var(--nova-ink)] max-[700px]:grid"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg v-if="!mobileMenuOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="size-6">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="size-6">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>

        <HeaderBrand @navigate="closeMenus" />

        <HeaderNavigation
          :active-menu="activeMenu"
          @toggle-categories="toggleCategories"
          @open-categories="openCategories"
          @close="closeMenus"
        />

        <HeaderActions
          :user="user"
          :display-name="displayName"
          :auth-loading="authLoading"
          :count="count"
          :search-open="searchOpen"
          @toggle-search="toggleSearch"
          @sign-out="handleSignOut"
          @close-menus="closeMenus"
          @auth-prompt="openAuthPrompt"
        />
      </div>

      <p v-if="authError" class="m-0 px-4 py-2 text-center text-xs text-[#bd342c] [overflow-wrap:anywhere]" role="alert">
        {{ authError }}
      </p>

      <HeaderSearch
        :open="searchOpen"
        :model-value="searchQuery"
        @update:model-value="searchQuery = $event"
        @submit="submitSearch"
      />

      <HeaderMegaMenu
        :open="activeMenu === 'categories'"
        :categories="categories"
        @close="closeMenus"
      />
    </div>

    <HeaderMobileMenu
      :open="mobileMenuOpen"
      :user="user"
      :display-name="displayName"
      :auth-loading="authLoading"
      :categories="categories"
      :links="[
        { label: 'صفحه اصلی', href: '/' },
        { label: 'تازه‌رسیده‌ها', href: '/products?sort=newest' },
        { label: 'درباره NOVA', href: '/about' }
      ]"
      @close="closeMenus"
      @sign-out="handleSignOut"
    />
  </header>

  <CartDrawer />
</template>
