<script setup>
import { featuredProducts } from '~/data/products'
import ProductCard from '~/components/product/ProductCard.vue'
</script>

<template>
  <section id="featured" class="relative overflow-hidden bg-[#fffefa] py-16 sm:py-24 lg:py-28" dir="rtl">
    <div class="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#d95d43]/[0.045] blur-3xl"></div>
    <div class="relative mx-auto w-[min(1320px,calc(100%-32px))] sm:w-[min(1320px,calc(100%-48px))]">
      <div class="mb-9 flex flex-col justify-between gap-6 sm:mb-12 sm:flex-row sm:items-end">
        <div><span class="mb-3 block text-[9px] font-bold tracking-[0.24em] text-[#d95d43]" dir="ltr">THE NOVA SELECTION / 2026</span><h2 class="text-3xl font-black leading-[1.5] text-[#20201e] sm:text-4xl lg:text-5xl">انتخاب‌های <span class="text-[#d95d43]">ویژه.</span></h2><p class="mt-3 text-sm leading-7 text-[#77756f]">قطعه‌هایی که قرار است بیشتر از یک فصل همراهت باشند.</p></div>
        <NuxtLink to="/products?sort=newest" class="group inline-flex min-h-12 items-center justify-between gap-8 rounded-full border border-[#d8d2c8] px-5 text-xs text-[#20201e] transition duration-300 hover:border-[#20201e] hover:bg-[#20201e] hover:text-white">تمام محصولات <span class="text-lg transition-transform group-hover:-translate-x-1">←</span></NuxtLink>
      </div>
      <div class="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-14 lg:grid-cols-4">
        <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
      </div>
      <div class="mt-12 flex flex-col gap-3 border-t border-[#e7e3db] pt-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between"><span class="text-xs text-[#77756f]">کمتر، اما بهتر. هر انتخاب با دقت.</span><NuxtLink to="/products" class="group inline-flex items-center gap-3 text-xs font-semibold text-[#d95d43]">کشف مجموعه کامل <span class="text-lg transition-transform group-hover:-translate-x-1">←</span></NuxtLink></div>
    </div>
  </section>
</template>