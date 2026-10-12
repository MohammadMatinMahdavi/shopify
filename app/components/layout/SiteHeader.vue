
<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

const links = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'محصولات', href: '/products' },
  { label: 'جدیدترین‌ها', href: '/products?sort=newest' },
  { label: 'درباره ما', href: '/about' }
]
</script>

<template>
  <header class="site-header">
    <div class="nova-container header-inner">
      <button
        class="icon-button mobile-menu-button"
        type="button"
        :aria-expanded="menuOpen"
        aria-label="باز کردن منو"
        @click="menuOpen = !menuOpen"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
          <path v-if="!menuOpen" d="M4 7h16M4 12h16M4 17h16" />
          <path v-else d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>

      <NuxtLink to="/" class="brand" aria-label="NOVA صفحه اصلی">
        NOVA<span>.</span>
      </NuxtLink>

      <nav class="desktop-nav" aria-label="منوی اصلی">
        <NuxtLink
          v-for="link in links"
          :key="link.label"
          :to="link.href"
          class="nav-link"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="header-actions">
        <button class="icon-button search-button" aria-label="جستجو" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
            <circle cx="10.8" cy="10.8" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
        </button>

        <NuxtLink to="/cart" class="cart-link">
          <span>سبد خرید</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
            <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
        </NuxtLink>
      </div>
    </div>

    <Transition name="mobile-menu">
      <nav v-if="menuOpen" class="mobile-nav nova-container">
        <NuxtLink
          v-for="link in links"
          :key="link.label"
          :to="link.href"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: relative;
  z-index: 20;
  background: var(--nova-bg);
  border-bottom: 1px solid var(--nova-border);
}

.header-inner {
  min-height: 86px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.brand {
  direction: ltr;
  font-family: Arial, sans-serif;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: -2px;
}

.brand span {
  color: var(--nova-accent);
}

.desktop-nav,
.header-actions {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  color: var(--nova-muted);
  font-size: 13px;
  transition: color 180ms ease;
}

.nav-link:hover {
  color: var(--nova-accent);
}

.header-actions {
  gap: 18px;
}

.icon-button {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.icon-button svg,
.cart-link svg {
  width: 22px;
  height: 22px;
}

.cart-link {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.mobile-menu-button,
.mobile-nav {
  display: none;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 800px) {
  .header-inner {
    min-height: 72px;
    gap: 12px;
  }

  .mobile-menu-button {
    display: grid;
  }

  .desktop-nav {
    display: none;
  }

  .brand {
    font-size: 29px;
  }

  .header-actions {
    gap: 8px;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    padding-top: 4px;
    padding-bottom: 20px;
    gap: 0;
  }

  .mobile-nav a {
    padding: 14px 0;
    border-top: 1px solid var(--nova-border);
    font-size: 14px;
  }

  .cart-link span {
    display: none;
  }
}

@media (max-width: 360px) {
  .header-inner {
    gap: 4px;
  }

  .header-actions {
    gap: 2px;
  }
}
</style>
