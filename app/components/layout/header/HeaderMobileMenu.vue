<script setup>
defineProps({
  links: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
  user: { type: Object, default: null },
  displayName: { type: String, default: 'کاربر NOVA' },
  authLoading: { type: Boolean, default: false },
})
defineEmits(['close', 'sign-out'])
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="-translate-y-2 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in motion-reduce:transition-none"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="-translate-y-2 opacity-0"
  >
    <nav aria-label="منوی موبایل" class="mx-auto hidden w-full max-w-[1440px] flex-col px-5 pb-[22px] pt-[5px] sm:px-8 max-[700px]:flex" dir="rtl">
      <NuxtLink v-for="link in links" :key="link.label" :to="link.href" class="flex justify-between border-t border-[var(--nova-border)] py-[14px] text-[13px]" @click="$emit('close')">
        {{ link.label }} <span class="text-[var(--nova-accent)]">↗</span>
      </NuxtLink>

      <NuxtLink v-if="!user" to="/auth" class="flex justify-between border-t border-[var(--nova-border)] py-[14px] text-[13px]" @click="$emit('close')">
        ورود / ثبت‌نام <span class="text-[var(--nova-accent)]">↗</span>
      </NuxtLink>
      <NuxtLink v-else to="/account" class="flex justify-between border-t border-[var(--nova-border)] py-[14px] text-[13px]" @click="$emit('close')">
        پروفایل {{ displayName }} <span class="text-[var(--nova-accent)]">↗</span>
      </NuxtLink>
      <button v-if="user" type="button" class="w-full border-t border-[var(--nova-border)] py-[14px] text-right text-[13px] disabled:cursor-wait disabled:opacity-60" :disabled="authLoading" @click="$emit('sign-out')">
        {{ authLoading ? 'در حال خروج...' : 'خروج از حساب' }}
      </button>

      <div class="flex flex-wrap gap-2 border-t border-[var(--nova-border)] pt-[18px]">
        <span class="mb-[5px] basis-full text-[11px] text-[var(--nova-muted)]">دسته‌بندی محصولات</span>
        <NuxtLink v-for="category in categories" :key="category.title" :to="category.href" class="bg-[#efebe3] px-[13px] py-[9px] text-[11px]" @click="$emit('close')">
          {{ category.title }}
        </NuxtLink>
      </div>
    </nav>
  </Transition>
</template>
