<script setup>
defineProps({ modelValue: { type: String, default: 'newest' } })
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="relative flex min-h-10 items-center gap-2 text-[11px] text-[#77756f]">
    <span class="shrink-0">مرتب‌سازی</span>
    <select :value="modelValue" aria-label="مرتب‌سازی محصولات" class="max-w-[190px] appearance-none rounded-xl border border-[#e7e3db] bg-[#fffefa] py-2 pl-8 pr-3 text-[11px] text-[#20201e] outline-none transition focus:border-[#d95d43]" @change="$emit('update:modelValue', $event.target.value)">
      <option value="newest">جدیدترین</option><option value="price-asc">قیمت: کم به زیاد</option><option value="price-desc">قیمت: زیاد به کم</option>
    </select>
    <svg class="pointer-events-none absolute left-3 h-3 w-3 stroke-current" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3 6 5 5 5-5"/></svg>
  </label>
</template>