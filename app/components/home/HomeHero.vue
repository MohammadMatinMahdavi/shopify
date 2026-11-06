<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const heroSwiper = ref(null)

const heroSlides = [
  { image: '/images/p1.jpg', alt: 'استایل مدرن مجموعه NOVA', label: 'THE NEW EDIT', number: '01' },
  { image: '/images/p2.jpg', alt: 'انتخاب‌های روزمره NOVA', label: 'DAILY ESSENTIALS', number: '02' },
  { image: '/images/p3.jpg', alt: 'کالکشن کفش‌های NOVA', label: 'THE NOVA COLLECTION', number: '03' },
  { image: '/images/p4.jpg', alt: 'اکسسوری‌های مجموعه NOVA', label: 'OBJECTS OF STYLE', number: '04' },
  { image: '/images/p5.jpg', alt: 'جزئیات استایل NOVA', label: 'PERSONAL DETAILS', number: '05' },
]

function handleSwiper(swiper) {
  heroSwiper.value = swiper
}

function slideNext() {
  heroSwiper.value?.slideNext()
}

function slidePrev() {
  heroSwiper.value?.slidePrev()
}
</script>

<template>
  <section class="relative isolate overflow-hidden bg-[#f0e3df]">
    <div class="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#b8a4c8]/[0.22] blur-3xl"></div>
    <div class="pointer-events-none absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-[#8eaaa0]/[0.16] blur-3xl"></div>


    <div class="mx-auto grid min-h-[650px] w-[min(1440px,100%)] grid-cols-1 items-center gap-0 px-5 py-12 sm:px-8 lg:min-h-[560px] lg:grid-cols-[minmax(0,1fr)_700px] lg:px-10 lg:py-16 xl:px-16">
      <div class="relative z-10 order-2 px-1 pb-3 pt-9 sm:px-2 lg:order-1 lg:py-10 lg:pl-8 xl:pl-12">
      
        <div class="flex items-center gap-3 text-[11px] font-medium text-[#77756f]"><span class="h-px w-9 bg-[#d95d43]"></span>مجموعه پاییز / زمستان ۱۴۰۵</div>
        <p class="mt-8 text-[10px] font-semibold tracking-[0.28em] text-[#d95d43]" dir="ltr">A MORE PERSONAL KIND OF STYLE</p>
        <h1 class="mt-4 max-w-[650px] text-[clamp(3.2rem,7vw,7.2rem)] font-black leading-[1.28] tracking-[-0.055em] text-[#20201e]">استایل تو،<span class="block text-[#d95d43]">قانون توست.</span></h1>
        <p class="mt-6 max-w-md text-sm leading-8 text-[#77756f] sm:text-base">برای روزهایی که قرار نیست شبیه همه باشی. انتخاب‌هایی با طراحی ماندگار، فرم‌های دقیق و جزئیاتی که به چشم می‌آیند.</p>
        <div class="mt-9 flex flex-wrap items-center gap-5">
          <NuxtLink to="/products" class="group inline-flex min-h-14 items-center gap-10 rounded-full bg-[#20201e] px-7 text-sm font-semibold text-white shadow-[0_12px_30px_rgb(32_32_30_/_16%)] transition duration-300 hover:-translate-y-1 hover:bg-[#d95d43]">کشف مجموعه <span class="text-xl transition-transform group-hover:-translate-x-1" aria-hidden="true">←</span></NuxtLink>
          <a href="#categories" class="inline-flex items-center gap-2 text-xs text-[#77756f] transition-colors hover:text-[#d95d43]"><span class="grid h-9 w-9 place-items-center rounded-full border border-[#d8d1c7] text-base">↓</span>دسته‌بندی‌ها</a>
        </div>
        <div class="mt-12 grid max-w-md grid-cols-3 border-t border-[#dcd5ca] pt-5">
          <div class="flex flex-col gap-1"><strong class="text-lg font-black text-[#20201e]" dir="ltr">01</strong><span class="text-[10px] text-[#77756f]">طراحی ماندگار</span></div>
          <div class="flex flex-col gap-1 border-r border-[#dcd5ca] pr-4"><strong class="text-lg font-black text-[#20201e]" dir="ltr">02</strong><span class="text-[10px] text-[#77756f]">انتخاب هوشمند</span></div>
          <div class="flex flex-col gap-1 border-r border-[#dcd5ca] pr-4"><strong class="text-lg font-black text-[#20201e]" dir="ltr">03</strong><span class="text-[10px] text-[#77756f]">امضای شخصی</span></div>
        </div>
      </div>

      <div class="group relative order-1 mx-auto h-[300px] w-full max-w-[700px] overflow-hidden rounded-[24px] bg-[#c8b9a8] sm:h-[360px] lg:order-2 lg:h-[400px] lg:w-[700px]">
        <Swiper
          :modules="[Autoplay]"
          :slides-per-view="1"
          :loop="true"
          :speed="850"
          :autoplay="{ delay: 4000, disableOnInteraction: false }"
          class="h-full w-full"
          @swiper="handleSwiper"
        >
          <SwiperSlide v-for="slide in heroSlides" :key="slide.number" class="h-full">
            <div class="relative h-full w-full overflow-hidden">
              <img
                :src="slide.image"
                :alt="slide.alt"
                :fetchpriority="slide.number === '01' ? 'high' : 'auto'"
                :loading="slide.number === '01' ? 'eager' : 'lazy'"
                class="h-full w-full object-contain object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.025]"
              />
              <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171614]/55 via-transparent to-[#171614]/10"></div>
              <div class="pointer-events-none absolute right-6 top-6 flex items-center gap-3 text-[9px] tracking-[0.2em] text-white/90 sm:right-8 sm:top-8" dir="ltr">
                <span class="h-px w-8 bg-white/70"></span>{{ slide.label }}
              </div>
              <div class="pointer-events-none absolute bottom-7 left-6 right-6 flex items-end justify-between gap-4 text-white sm:bottom-8 sm:left-8 sm:right-8">
                <div><span class="mb-2 block text-[9px] tracking-[0.24em] text-white/70" dir="ltr">NOVA STUDIO PRESENTS</span><p class="text-2xl font-bold sm:text-3xl">فراتر از یک انتخاب.</p></div>
                <span class="text-[10px] tracking-[0.2em] text-white/80" dir="ltr">0{{ slide.number }} / 05</span>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div class="absolute bottom-5 right-5 z-20 flex items-center gap-2 rounded-full border border-white/35 bg-white/15 p-1.5 text-white shadow-lg backdrop-blur-xl sm:bottom-6 sm:right-6">
          <button type="button" aria-label="تصویر قبلی" class="grid h-10 w-10 place-items-center rounded-full transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" @click="slidePrev">←</button>
          <span class="h-5 w-px bg-white/35"></span>
          <button type="button" aria-label="تصویر بعدی" class="grid h-10 w-10 place-items-center rounded-full transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" @click="slideNext">→</button>
        </div>
      </div>
    </div>
  </section>
</template>
