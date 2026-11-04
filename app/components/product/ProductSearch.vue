<script setup>
defineProps({ modelValue: { type: String, default: '' } })
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="flex min-h-12 min-w-0 items-center gap-3 rounded-xl border border-[#e7e3db] bg-[#f7f5f0] px-4 transition focus-within:border-[#d95d43] focus-within:ring-2 focus-within:ring-[#d95d43]/10">
    <svg class="h-5 w-5 shrink-0 stroke-[#8b877f]" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.5"/><path d="m16 16 4 4"/></svg>
    <input :value="modelValue" type="search" placeholder="نام محصول را جست‌وجو کن..." aria-label="جست‌وجوی محصولات" class="min-w-0 flex-1 border-0 bg-transparent text-xs text-[#20201e] outline-none placeholder:text-[#99958c] focus:ring-0" @input="$emit('update:modelValue', $event.target.value)">
    <button v-if="modelValue" type="button" aria-label="پاک کردن جست‌وجو" class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#eee9e1] text-lg text-[#77756f] transition hover:bg-[#d95d43] hover:text-white" @click="$emit('update:modelValue', '')">×</button>
  </label>
</template>