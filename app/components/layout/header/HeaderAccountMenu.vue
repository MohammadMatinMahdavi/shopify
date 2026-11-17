<script setup>
import { ref } from 'vue'

defineProps({
  displayName: { type: String, default: 'کاربر NOVA' },
  email: { type: String, default: '' },
  loading: { type: Boolean, default: false },
})
defineEmits(['sign-out', 'close'])
const isOpen = ref(false)
</script>

<template>
  <div class="relative max-[700px]:static">
    <button
      type="button"
      class="inline-flex max-w-[190px] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[var(--nova-border)] bg-[var(--nova-surface)] px-[11px] py-2 text-[11px] text-[var(--nova-ink)] transition-colors hover:border-[#d7c7bb] hover:bg-[var(--nova-accent-soft)]"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <span class="grid size-[25px] shrink-0 place-items-center rounded-full bg-[var(--nova-accent-soft)] text-xs font-bold text-[var(--nova-accent)]">{{ displayName.slice(0, 1) }}</span>
      <span class="overflow-hidden text-ellipsis">{{ displayName }}</span>
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" class="size-[13px] shrink-0 transition-transform" :class="{ 'rotate-180': isOpen }">
        <path d="m3 6 5 5 5-5" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="-translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in motion-reduce:transition-none"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-1 opacity-0"
    >
      <div v-if="isOpen" class="absolute left-0 top-[calc(100%+12px)] z-[80] w-[270px] rounded-[18px] border border-[var(--nova-border)] bg-[var(--nova-surface)] p-[10px] shadow-[var(--nova-shadow-card)] max-[700px]:right-4 max-[700px]:left-4 max-[700px]:top-[calc(100%+6px)] max-[700px]:w-auto">
        <div class="mb-[6px] flex items-center gap-[11px] border-b border-[var(--nova-border)] px-[10px] pb-[15px] pt-3">
          <span class="grid size-[42px] shrink-0 place-items-center rounded-full bg-[var(--nova-accent-soft)] text-[17px] font-bold text-[var(--nova-accent)]">{{ displayName.slice(0, 1) }}</span>
          <span class="flex min-w-0 flex-col gap-1">
            <strong class="text-xs">{{ displayName }}</strong>
            <small class="[overflow-wrap:anywhere] text-[10px] text-[var(--nova-muted)]">{{ email }}</small>
          </span>
        </div>
        <NuxtLink to="/account" class="flex w-full items-center gap-[10px] rounded-[10px] px-[10px] py-3 text-right text-xs text-[var(--nova-ink)] hover:bg-[var(--nova-surface-soft)]" @click="isOpen = false; $emit('close')">
          <span class="w-5 text-center text-base">⌁</span>
          پروفایل من
          <span class="mr-auto text-[var(--nova-muted)]">←</span>
        </NuxtLink>
        <button type="button" class="flex w-full items-center gap-[10px] rounded-[10px] px-[10px] py-3 text-right text-xs text-[#a34232] hover:bg-[var(--nova-surface-soft)] disabled:cursor-wait disabled:opacity-60" :disabled="loading" @click="$emit('sign-out')">
          <span class="w-5 text-center text-base">↗</span>
          {{ loading ? 'در حال خروج...' : 'خروج از حساب' }}
        </button>
      </div>
    </Transition>
  </div>
</template>
