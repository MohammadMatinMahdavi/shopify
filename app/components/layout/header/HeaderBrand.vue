<template>
  <NuxtLink
    to="/"
    aria-label="NOVA صفحه اصلی"
    class="flex shrink-0 flex-col items-start [direction:ltr] [font-family:Arial,sans-serif] max-[700px]:order-1 max-[700px]:mx-auto"
    @click="$emit('navigate')"
  >
    <span class="text-[31px] font-black leading-[.9] tracking-[-2px]">NOVA<span class="text-[var(--nova-accent)]">.</span></span>
    <small class="mt-2 text-[7px] font-medium tracking-[2.1px] text-[var(--nova-muted)]">OBJECTS OF STYLE</small>
  </NuxtLink>
</template>

<script setup>
defineEmits(['navigate'])
</script>
