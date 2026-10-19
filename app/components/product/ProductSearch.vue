<script setup>
defineProps({
  modelValue: { type: String, default: '' },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="product-search">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
    <input
      :value="modelValue"
      type="search"
      placeholder="نام محصول را جست‌وجو کن..."
      aria-label="جست‌وجوی محصولات"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <button v-if="modelValue" type="button" aria-label="پاک کردن جست‌وجو" @click="$emit('update:modelValue', '')">×</button>
  </label>
</template>

<style scoped>
.product-search{display:flex;align-items:center;gap:12px;min-width:0;min-height:50px;padding:0 16px;border:1px solid var(--nova-border);border-radius:var(--nova-radius-md);background:var(--nova-surface)}
.product-search svg{width:19px;height:19px;flex:0 0 auto;stroke:var(--nova-muted);stroke-width:1.6}
.product-search input{width:100%;min-width:0;border:0;outline:0;background:transparent;color:var(--nova-ink);font-size:12px}
.product-search input::placeholder{color:#99958c}
.product-search button{width:27px;height:27px;border:0;border-radius:50%;background:var(--nova-surface-soft);color:var(--nova-muted);font-size:20px;cursor:pointer}
.product-search:focus-within{border-color:var(--nova-accent);box-shadow:0 0 0 3px var(--nova-accent-soft)}
</style>
