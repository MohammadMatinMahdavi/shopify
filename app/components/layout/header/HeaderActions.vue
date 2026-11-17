<script setup>
import HeaderAccountMenu from './HeaderAccountMenu.vue'

defineProps({
  user: { type: Object, default: null },
  displayName: { type: String, default: 'کاربر NOVA' },
  authLoading: { type: Boolean, default: false },
  count: { type: Number, default: 0 },
})
defineEmits(['toggle-search', 'sign-out', 'close-menus', 'auth-prompt'])
</script>

<template>
  <div class="flex items-center gap-[17px] max-[900px]:gap-2 max-[700px]:order-2 max-[700px]:gap-[3px]">
    <button
      type="button"
      aria-label="جستجو"
      class="grid size-[39px] place-items-center border border-transparent bg-transparent text-[var(--nova-ink)] transition-colors hover:border-[var(--nova-border)] hover:bg-[var(--nova-surface)] max-[700px]:size-[34px]"
      aria-expanded="false"
      @click="$emit('toggle-search')"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="size-[21px]">
        <circle cx="10.8" cy="10.8" r="6.5" />
        <path d="m16 16 4 4" />
      </svg>
    </button>

    <NuxtLink v-if="!user" to="/auth" aria-label="ورود به حساب کاربری" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[var(--nova-border)] bg-[var(--nova-surface)] px-[11px] py-2 text-[11px] text-[var(--nova-ink)] transition-colors hover:border-[#d7c7bb] hover:bg-[var(--nova-accent-soft)] max-[700px]:px-[9px] max-[700px]:py-[7px] max-[700px]:text-[10px]">
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" class="size-[19px] shrink-0">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.7-3.4 3.2-5.2 7-5.2s6.3 1.8 7 5.2" />
      </svg>
      <span>ورود</span>
    </NuxtLink>

    <HeaderAccountMenu
      v-else
      :display-name="displayName"
      :email="user.email"
      :loading="authLoading"
      @sign-out="$emit('sign-out')"
      @close="$emit('close-menus')"
    />

    <NuxtLink v-if="user" to="/cart" aria-label="سبد خرید" class="inline-flex items-center gap-[9px] whitespace-nowrap text-xs">
      <span class="max-[700px]:hidden">سبد خرید</span>
      <span class="relative inline-flex">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="size-[21px]">
          <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
          <circle cx="10" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
        <span v-if="count > 0" class="absolute -left-2 -top-[7px] grid h-[17px] min-w-[17px] place-items-center rounded-full bg-[var(--nova-accent)] px-1 font-[Arial,sans-serif] text-[10px] text-white">{{ count }}</span>
      </span>
    </NuxtLink>
    <button v-else type="button" aria-label="برای دسترسی به سبد خرید وارد حساب شو" class="inline-flex items-center gap-[9px] whitespace-nowrap text-xs" @click="$emit('auth-prompt')">
      <span class="max-[700px]:hidden">سبد خرید</span>
      <span class="relative inline-flex">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="size-[21px]">
          <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
          <circle cx="10" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
        <span v-if="count > 0" class="absolute -left-2 -top-[7px] grid h-[17px] min-w-[17px] place-items-center rounded-full bg-[var(--nova-accent)] px-1 font-[Arial,sans-serif] text-[10px] text-white">{{ count }}</span>
      </span>
    </button>
  </div>
</template>
