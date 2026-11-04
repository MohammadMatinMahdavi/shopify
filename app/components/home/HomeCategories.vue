<script setup>
import { novaCategories } from '~/data/categories'
</script>

<template>
  <section id="categories" class="bg-[#f8f6f2] py-16 sm:py-24 lg:py-28" dir="rtl">
    <div class="mx-auto w-[min(1320px,calc(100%-32px))] sm:w-[min(1320px,calc(100%-48px))]">
      <header class="mb-9 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
        <div>
          <span class="mb-3 block text-[9px] font-bold tracking-[0.24em] text-[#d95d43]" dir="ltr">EXPLORE THE NOVA WORLD</span>
          <h2 class="text-3xl font-black leading-[1.5] text-[#20201e] sm:text-4xl lg:text-5xl">دنیای خودت را <span class="text-[#d95d43]">انتخاب کن.</span></h2>
          <p class="mt-3 text-sm leading-7 text-[#77756f]">چهار مسیر برای ساختن استایلی که فقط به تو تعلق دارد.</p>
        </div>
        <span class="text-[10px] tracking-[0.18em] text-[#99938a]" dir="ltr">01 — 04 / CATEGORIES</span>
      </header>
      <div class="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        <NuxtLink v-for="(category,index) in novaCategories" :key="category.slug" :to="category.href" class="group relative isolate min-h-[260px] overflow-hidden rounded-2xl bg-[#d8cfc2] sm:min-h-[350px] lg:min-h-[440px]" :class="index===0 ? 'lg:col-span-2 lg:row-span-1 lg:min-h-[500px]' : ''">
          <img :src="category.image" :alt="category.title" loading="lazy" class="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#171614]/80 via-[#171614]/10 to-transparent transition-colors duration-500 group-hover:from-[#171614]/90"></div>
          <span class="absolute right-4 top-4 rounded-full border border-white/40 bg-black/10 px-3 py-1.5 text-[9px] tracking-[0.15em] text-white backdrop-blur-sm sm:right-6 sm:top-6" dir="ltr">0{{ index+1 }} / NOVA</span>
          <div class="absolute inset-x-4 bottom-5 text-white sm:inset-x-6 sm:bottom-7">
            <span class="mb-2 block text-[10px] text-white/70">{{ category.subtitle }}</span>
            <div class="flex items-end justify-between gap-2">
              <div><h3 class="text-xl font-extrabold sm:text-2xl lg:text-3xl">{{ category.title }}</h3><p class="mt-1 hidden text-xs text-white/70 sm:block">{{ category.description }}</p></div>
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/60 text-xl transition duration-300 group-hover:-translate-x-1 group-hover:border-white group-hover:bg-white group-hover:text-[#20201e]">←</span>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div class="mt-7 flex items-center justify-between border-t border-[#e3ded5] pt-5 text-[10px] text-[#8b857d]"><span>چهار انتخاب، بی‌نهایت امکان</span><span dir="ltr">YOUR STYLE. YOUR RULES.</span></div>
    </div>
  </section>
</template>