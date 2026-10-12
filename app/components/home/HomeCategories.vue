
<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade, A11y } from 'swiper/modules'

const slides = [
  {
    id: 1,
    category: 'کفش‌ها',
    eyebrow: 'THE NEW COLLECTION',
    title: 'کفش‌هایی برای\nقدم‌های متفاوت',
    description: 'ترکیبی از طراحی خاص، راحتی و جزئیاتی که دیده می‌شوند.',
    image: '/images/p2.jpg',
    link: '/products?category=shoes',
  },
  {
    id: 2,
    category: 'کتانی‌ها',
    eyebrow: 'STREET CULTURE',
    title: 'استایل خیابانی،\nقانون خودت',
    description: 'کتانی‌هایی برای کسانی که استایل خودشان را می‌سازند.',
    image: '/images/p3.jpg',
    link: '/products?category=sneakers',
  },
  {
    id: 3,
    category: 'کیف‌ها',
    eyebrow: 'EVERYDAY ESSENTIALS',
    title: 'جزئیاتی که\nاستایل را کامل می‌کنند',
    description: 'کیف‌هایی با طراحی مینیمال برای لحظه‌های روزمره.',
    image: '/images/p4.jpg',
    link: '/products?category=bags',
  },
  {
    id: 4,
    category: 'اکسسوری',
    eyebrow: 'THE FINAL TOUCH',
    title: 'تفاوت در\nجزئیات است',
    description: 'اکسسوری‌هایی برای امضای شخصی استایل تو.',
    image: '/images/p5.jpg',
    link: '/products?category=accessories',
  },
]

const swiperInstance = ref(null)
const activeIndex = ref(0)

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.realIndex
}

const goToSlide = (index) => {
  swiperInstance.value?.slideToLoop(index)
}
</script>

<template>
  <section class="category-section" dir="rtl">
    <header class="category-heading">
      <div>
        <span class="category-eyebrow">EXPLORE NOVA</span>
        <h2>دنیای خودت را پیدا کن<span>.</span></h2>
        <p>برای هر استایل، یک انتخاب متفاوت.</p>
      </div>

      <div class="category-counter" dir="ltr">
        <span>{{ String(activeIndex + 1).padStart(2, '0') }}</span>
        <i></i>
        <span class="counter-total">
          {{ String(slides.length).padStart(2, '0') }}
        </span>
      </div>
    </header>

    <div class="category-slider">
      <Swiper
        :modules="[Autoplay, EffectFade, A11y]"
        :slides-per-view="1"
        :loop="true"
        effect="fade"
        :fade-effect="{ crossFade: true }"
        :speed="650"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="(slide, index) in slides" :key="slide.id">
          <article class="category-slide">
            <img
              class="slide-image"
              :src="slide.image"
              :alt="slide.category"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
            />

            <div class="slide-overlay"></div>
            <div class="slide-light"></div>
            <div class="slide-grain"></div>

            <div class="slide-topline">
              <span>{{ slide.eyebrow }}</span>
              <span>NO. {{ String(index + 1).padStart(2, '0') }}</span>
            </div>

            <div class="slide-content">
              <span class="slide-category">{{ slide.category }}</span>
              <h3>{{ slide.title }}</h3>
              <p>{{ slide.description }}</p>

              <NuxtLink :to="slide.link" class="slide-cta">
                <span>مشاهده مجموعه</span>
                <span class="cta-arrow" aria-hidden="true">←</span>
              </NuxtLink>
            </div>

            <div class="slide-bottomline">
              <span>YOUR STYLE. YOUR RULES.</span>
              <span>NOVA STUDIO</span>
            </div>
          </article>
        </SwiperSlide>
      </Swiper>

      <button
        class="slider-arrow slider-arrow-next"
        type="button"
        aria-label="اسلاید بعدی"
        @click="swiperInstance?.slideNext()"
      >
        →
      </button>

      <button
        class="slider-arrow slider-arrow-prev"
        type="button"
        aria-label="اسلاید قبلی"
        @click="swiperInstance?.slidePrev()"
      >
        ←
      </button>

      <div class="slider-progress" aria-hidden="true">
        <span
          v-for="(slide, index) in slides"
          :key="slide.id"
          :class="{ 'progress-active': index === activeIndex }"
        >
          <i v-if="index === activeIndex" :key="activeIndex"></i>
        </span>
      </div>

      <div class="slider-dots" aria-label="انتخاب اسلاید">
        <button
          v-for="(slide, index) in slides"
          :key="slide.id"
          type="button"
          :aria-label="`نمایش ${slide.category}`"
          :aria-current="index === activeIndex ? 'true' : undefined"
          :class="{ 'dot-active': index === activeIndex }"
          @click="goToSlide(index)"
        ></button>
      </div>
    </div>

    <footer class="category-caption">
      <span>چهار انتخاب، بی‌نهایت امکان</span>
      <span>کالکشن NOVA</span>
    </footer>
  </section>
</template>
