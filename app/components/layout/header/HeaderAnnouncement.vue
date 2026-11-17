<template>
  <div class="flex min-h-[34px] items-center justify-center gap-[14px] bg-[var(--nova-ink)] px-5 py-[7px] text-[10px] tracking-[.1px] text-[#fffefa]">
    <span>انتخاب‌های تازه، برای استایل متفاوت تو</span>
    <span class="size-[3px] shrink-0 rounded-full bg-[var(--nova-accent)]"></span>
    <NuxtLink to="/products?sort=newest" class="group text-[#f2b19f]">
      کشف مجموعه جدید
      <span class="mr-[5px] inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span>
    </NuxtLink>
  </div>
</template>
