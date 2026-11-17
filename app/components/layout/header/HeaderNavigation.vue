<script setup>
defineProps({
  activeMenu: { type: String, default: '' },
})
defineEmits(['toggle-categories', 'open-categories', 'close'])
</script>

<template>
  <nav aria-label="منوی اصلی" class="flex h-full items-stretch gap-[clamp(18px,2.5vw,38px)] max-[900px]:gap-4 max-[700px]:hidden">
    <NuxtLink to="/" class="group relative inline-flex items-center whitespace-nowrap text-xs text-[#5f5b55] transition-colors hover:text-[var(--nova-ink)] focus-visible:text-[var(--nova-ink)]" @click="$emit('close')">
      خانه
      <span class="absolute bottom-6 right-0 h-px w-0 bg-[var(--nova-accent)] transition-all duration-300 group-hover:w-full group-focus-visible:w-full"></span>
    </NuxtLink>

    <button
      type="button"
      class="group relative inline-flex items-center gap-[7px] whitespace-nowrap border-0 bg-transparent text-xs text-[#5f5b55] transition-colors hover:text-[var(--nova-ink)] focus-visible:text-[var(--nova-ink)]"
      :aria-expanded="activeMenu === 'categories'"
      @mouseenter="$emit('open-categories')"
      @focus="$emit('open-categories')"
      @click="$emit('toggle-categories')"
    >
      دسته‌بندی‌ها
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" class="size-[13px] transition-transform duration-200" :class="{ 'rotate-180': activeMenu === 'categories' }">
        <path d="m3 6 5 5 5-5" />
      </svg>
      <span class="absolute bottom-6 right-0 h-px w-0 bg-[var(--nova-accent)] transition-all duration-300 group-hover:w-full"></span>
    </button>

    <NuxtLink to="/products?sort=newest" class="group relative inline-flex items-center whitespace-nowrap text-xs text-[#5f5b55] transition-colors hover:text-[var(--nova-ink)]" @click="$emit('close')">
      تازه‌رسیده‌ها
      <span class="absolute bottom-6 right-0 h-px w-0 bg-[var(--nova-accent)] transition-all duration-300 group-hover:w-full"></span>
    </NuxtLink>

    <NuxtLink to="/about" class="group relative inline-flex items-center whitespace-nowrap text-xs text-[#5f5b55] transition-colors hover:text-[var(--nova-ink)]" @click="$emit('close')">
      داستان NOVA
      <span class="absolute bottom-6 right-0 h-px w-0 bg-[var(--nova-accent)] transition-all duration-300 group-hover:w-full"></span>
    </NuxtLink>
  </nav>
</template>
