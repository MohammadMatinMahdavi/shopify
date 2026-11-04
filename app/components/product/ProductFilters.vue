<script setup>
import { novaCategories } from '~/data/categories'
defineProps({ modelValue: { type: String, default: '' } })
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-wrap items-center gap-2" role="group" aria-label="فیلتر دسته‌بندی محصولات">
    <button type="button" :aria-pressed="!modelValue" class="min-h-10 rounded-full border px-4 text-[11px] transition duration-200" :class="!modelValue ? 'border-[#20201e] bg-[#20201e] text-white' : 'border-[#e7e3db] bg-[#fffefa] text-[#77756f] hover:border-[#20201e] hover:text-[#20201e]'" @click="$emit('update:modelValue', '')">همه محصولات</button>
    <button v-for="category in novaCategories" :key="category.slug" type="button" :aria-pressed="modelValue === category.slug" class="min-h-10 rounded-full border px-4 text-[11px] transition duration-200" :class="modelValue === category.slug ? 'border-[#20201e] bg-[#20201e] text-white' : 'border-[#e7e3db] bg-[#fffefa] text-[#77756f] hover:border-[#20201e] hover:text-[#20201e]'" @click="$emit('update:modelValue', category.slug)">{{ category.title }}</button>
  </div>
</template>