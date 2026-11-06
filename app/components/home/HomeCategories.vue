<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { novaCategories } from '~/data/categories'

const section = ref(null)
const swiperInstance = ref(null)

useScrollReveal(section)

function handleSwiper(swiper) {
  swiperInstance.value = swiper
}

function slideNext() {
  swiperInstance.value?.slideNext()
}

function slidePrev() {
  swiperInstance.value?.slidePrev()
}
</script>

<template>
  <section id="categories" ref="section" class="overflow-hidden bg-[#e7e1eb] py-16 sm:py-24 lg:py-28" dir="rtl">
    <div class="mx-auto w-[min(1320px,calc(100%-32px))] sm:w-[min(1320px,calc(100%-48px))]">
      <header class="mb-9 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end" data-gsap-reveal>
        <div>
          <span class="mb-3 block text-[9px] font-bold tracking-[0.24em] text-[#d95d43]" dir="ltr">EXPLORE THE NOVA WORLD</span>
          <h2 class="text-3xl font-black leading-[1.5] text-[#29232c] sm:text-4xl lg:text-5xl">دنیای خودت را <span class="text-[#d95d43]">انتخاب کن.</span></h2>
          <p class="mt-3 text-sm leading-7 text-[#77756f]">چهار مسیر برای ساختن استایلی که فقط به تو تعلق دارد.</p>
        </div>
        <div class="flex items-center justify-between gap-5 sm:justify-end">
          <span class="text-[10px] tracking-[0.18em] text-[#99938a]" dir="ltr">01 — 04 / CATEGORIES</span>
          <div class="flex items-center gap-2" dir="ltr">
            <button type="button" aria-label="دسته‌بندی قبلی" class="grid h-10 w-10 place-items-center rounded-full border border-[#c9bfce] text-lg text-[#29232c] transition hover:border-[#d95d43] hover:bg-[#d95d43] hover:text-white" @click="slidePrev">←</button>
            <button type="button" aria-label="دسته‌بندی بعدی" class="grid h-10 w-10 place-items-center rounded-full border border-[#c9bfce] text-lg text-[#29232c] transition hover:border-[#d95d43] hover:bg-[#d95d43] hover:text-white" @click="slideNext">→</button>
          </div>
        </div>
      </header>

      <Swiper
        dir="rtl"
        :modules="[Autoplay]"
        :slides-per-view="1.15"
        :space-between="12"
        :loop="true"
        :autoplay="{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }"
        :breakpoints="{ 640: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 20 }, 1280: { slidesPerView: 3.25, spaceBetween: 24 } }"
        class="!overflow-visible"
        @swiper="handleSwiper"
      >
        <SwiperSlide v-for="(category, index) in novaCategories" :key="category.slug" class="!h-auto">
          <NuxtLink :to="category.href" class="group relative isolate block min-h-[300px] h-full overflow-hidden rounded-2xl bg-[#d8cfc2] shadow-[0_18px_50px_rgba(41,35,44,0.10)] sm:min-h-[380px] lg:min-h-[440px]">
            <img :src="category.image" :alt="category.title" loading="lazy" class="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#171614]/80 via-[#171614]/10 to-transparent transition-colors duration-500 group-hover:from-[#171614]/90"></div>
            <span class="absolute right-4 top-4 rounded-full border border-white/40 bg-black/10 px-3 py-1.5 text-[9px] tracking-[0.15em] text-white backdrop-blur-sm sm:right-6 sm:top-6" dir="ltr">0{{ index + 1 }} / NOVA</span>
            <div class="absolute inset-x-4 bottom-5 text-white sm:inset-x-6 sm:bottom-7">
              <span class="mb-2 block text-[10px] text-white/70">{{ category.subtitle }}</span>
              <div class="flex items-end justify-between gap-2">
                <div>
                  <h3 class="text-xl font-extrabold sm:text-2xl lg:text-3xl">{{ category.title }}</h3>
                  <p class="mt-1 hidden text-xs text-white/70 sm:block">{{ category.description }}</p>
                </div>
                <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/60 text-xl transition duration-300 group-hover:-translate-x-1 group-hover:border-white group-hover:bg-white group-hover:text-[#20201e]">←</span>
              </div>
            </div>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>

      <div class="mt-7 flex items-center justify-between border-t border-[#d1c8d9] pt-5 text-[10px] text-[#62596a]">
        <span>چهار انتخاب، بی‌نهایت امکان</span>
        <span dir="ltr">YOUR STYLE. YOUR RULES.</span>
      </div>
    </div>
  </section>
</template>
