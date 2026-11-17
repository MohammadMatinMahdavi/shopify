<script setup>
defineProps({
  categories: { type: Array, default: () => [] },
})
defineEmits(['close'])
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
    <div class="absolute left-0 right-0 top-full z-[60] border-b border-[var(--nova-border)] bg-[var(--nova-surface)] shadow-[0_24px_45px_#20201e12]" @mouseenter="$emit('keep-open')">
      <div class="mx-auto flex max-w-[1440px] items-stretch gap-[22px] px-5 pb-[34px] pt-[30px] sm:px-8 lg:px-10 max-[900px]:gap-[14px]">
        <div class="min-w-[160px] flex-[1.15_1_0] pt-[10px]">
          <span class="font-[Arial,sans-serif] text-[9px] tracking-[1.8px] text-[var(--nova-accent)]">FIND YOUR STYLE</span>
          <h2 class="my-3 mt-4 text-[clamp(22px,2.2vw,31px)] font-bold leading-[1.7]">
            انتخابی که<br /><span class="text-[var(--nova-accent)]">شبیه توست.</span>
          </h2>
          <p class="max-w-[230px] text-[11px] leading-[2] text-[var(--nova-muted)]">از جزئیات کوچک تا انتخاب‌های بزرگ؛ استایل خودت را پیدا کن.</p>
          <NuxtLink to="/products" class="mt-4 inline-flex gap-3 border-b border-[var(--nova-border)] pb-[7px] text-[11px]" @click="$emit('close')">
            مشاهده همه محصولات <span class="transition-transform hover:-translate-x-1">←</span>
          </NuxtLink>
        </div>

        <NuxtLink
          v-for="(category, index) in categories"
          :key="category.title"
          :to="category.href"
          class="min-w-0 flex-1"
          @click="$emit('close')"
        >
          <div class="relative aspect-[4/4.8] overflow-hidden rounded-[var(--nova-radius-md)] bg-[#eee9e1]">
            <img :src="category.image" :alt="category.title" class="size-full object-cover transition-transform duration-500 hover:scale-[1.055]" />
            <span class="absolute left-[10px] top-[10px] font-[Arial,sans-serif] text-[10px] text-white [text-shadow:0_1px_5px_#0008]">0{{ index + 1 }}</span>
            <span class="absolute bottom-[10px] right-[10px] grid size-7 place-items-center bg-[var(--nova-surface)] transition-colors hover:bg-[var(--nova-accent)] hover:text-white">↗</span>
          </div>
          <div class="flex items-center justify-between gap-[6px] pt-3 max-[900px]:flex-col max-[900px]:items-start">
            <strong class="text-[13px]">{{ category.title }}</strong>
            <span class="text-[9px] text-[var(--nova-muted)]">{{ category.subtitle }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </Transition>
</template>
