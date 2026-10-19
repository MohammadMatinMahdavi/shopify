<script setup>
import { novaCategories } from '~/data/categories'

defineProps({
  modelValue: { type: String, default: '' },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="category-filters" role="group" aria-label="فیلتر دسته‌بندی محصولات">
    <button
      type="button"
      :aria-pressed="!modelValue"
      :class="{ active: !modelValue }"
      @click="$emit('update:modelValue', '')"
    >همه محصولات</button>
    <button
      v-for="category in novaCategories"
      :key="category.slug"
      type="button"
      :aria-pressed="modelValue === category.slug"
      :class="{ active: modelValue === category.slug }"
      @click="$emit('update:modelValue', category.slug)"
    >{{ category.title }}</button>
  </div>
</template>

<style scoped>
.category-filters{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.category-filters button{min-height:38px;padding:0 16px;border:1px solid var(--nova-border);border-radius:var(--nova-radius-pill);background:transparent;color:var(--nova-muted);font-size:11px;white-space:nowrap;cursor:pointer;transition:background .2s,color .2s,border-color .2s}
.category-filters button:hover{border-color:var(--nova-ink);color:var(--nova-ink)}
.category-filters button.active{border-color:var(--nova-ink);background:var(--nova-ink);color:white}
@media(max-width:560px){.category-filters{gap:7px}.category-filters button{min-height:35px;padding:0 12px;font-size:10px}}
</style>
