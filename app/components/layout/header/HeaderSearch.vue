<script setup>
defineProps({
  modelValue: { type: String, default: '' },
})
defineEmits(['update:modelValue', 'submit'])
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="-translate-y-1 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in motion-reduce:transition-none"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="-translate-y-1 opacity-0"
  >
    <form
      class="mx-auto flex w-full max-w-[1440px] items-center gap-4 border-t border-[var(--nova-border)] px-5 py-[18px] sm:px-8 lg:px-10"
      @submit.prevent="$emit('submit')"
    >
      <input
        :value="modelValue"
        type="search"
        placeholder="دنبال چه چیزی می‌گردی؟"
        aria-label="جستجوی محصولات"
        autofocus
        class="min-w-0 flex-1 border-0 border-b border-[var(--nova-border)] bg-transparent py-[13px] text-[13px] text-[var(--nova-ink)] outline-none focus:border-[var(--nova-accent)]"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <button type="submit" class="bg-[var(--nova-ink)] px-[18px] py-[13px] text-[11px] text-white transition-colors hover:bg-[var(--nova-accent)]">
        جستجو <span class="mr-2">←</span>
      </button>
    </form>
  </Transition>
</template>
