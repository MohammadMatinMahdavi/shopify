<script setup>
defineProps({
  modelValue: { type: String, default: 'newest' },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="product-sort">
    <span>مرتب‌سازی</span>
    <select :value="modelValue" aria-label="مرتب‌سازی محصولات" @change="$emit('update:modelValue', $event.target.value)">
      <option value="newest">جدیدترین</option>
      <option value="price-asc">قیمت: کم به زیاد</option>
      <option value="price-desc">قیمت: زیاد به کم</option>
    </select>
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3 6 5 5 5-5"/></svg>
  </label>
</template>

<style scoped>
.product-sort{position:relative;display:flex;align-items:center;gap:10px;min-height:42px;color:var(--nova-muted);font-size:11px;white-space:nowrap}
.product-sort select{max-width:190px;min-height:40px;padding:0 12px 0 32px;border:1px solid var(--nova-border);border-radius:12px;appearance:none;background:var(--nova-surface);color:var(--nova-ink);font:inherit;cursor:pointer}
.product-sort svg{position:absolute;left:12px;width:13px;height:13px;pointer-events:none;stroke:currentColor;stroke-width:1.5}
@media(max-width:560px){.product-sort{gap:6px}.product-sort select{max-width:155px;padding-right:9px;font-size:10px}}
</style>
