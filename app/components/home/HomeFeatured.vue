<script setup>
import { featuredProducts } from '~/data/products'
import ProductCard from '~/components/product/ProductCard.vue'
</script>

<template>
  <section id="featured" class="bg-[#fffefa] py-14 sm:py-20 lg:py-24" dir="rtl">
    <div class="mx-auto w-[min(1320px,calc(100%-32px))] sm:w-[min(1320px,calc(100%-48px))]">
      <div class="mb-7 flex flex-col items-start justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end">
        <div class="min-w-0">
          <span class="mb-3 block text-[9px] font-semibold tracking-[0.2em] text-[#d95d43]" dir="ltr">JUST LANDED — NOVA EDIT</span>
          <h2 class="text-3xl font-extrabold leading-[1.6] text-[#20201e] sm:text-4xl lg:text-[2.8rem]">تازه‌رسیده‌های <span class="text-[#d95d43]">ما</span></h2>
          <p class="mt-2 text-sm leading-7 text-[#77756f]">انتخاب‌های تازه‌ای که ارزش دیده‌شدن دارند.</p>
        </div>
        <NuxtLink to="/products?sort=newest" class="group inline-flex items-center gap-3 border-b border-[#e7e3db] pb-2 text-xs transition-colors hover:border-[#d95d43] hover:text-[#d95d43]">مشاهده همه محصولات <span class="text-lg transition-transform group-hover:-translate-x-1">←</span></NuxtLink>
      </div>
      <div class="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4">
        <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
      </div>
      <div class="mt-10 flex items-center justify-between gap-4 border-t border-[#e7e3db] pt-5 sm:mt-14">
        <span class="text-xs text-[#77756f]">کمتر، اما بهتر.</span>
        <NuxtLink to="/products" class="group inline-flex items-center gap-3 text-xs text-[#20201e] transition-colors hover:text-[#d95d43]">کشف مجموعه کامل <span class="text-lg transition-transform group-hover:-translate-x-1">←</span></NuxtLink>
      </div>
    </div>
  </section>
</template>