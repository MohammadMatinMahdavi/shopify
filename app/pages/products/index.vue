<script setup>
import { computed } from 'vue'
import SiteHeader from '~/components/layout/SiteHeader.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import ProductCard from '~/components/product/ProductCard.vue'
import ProductSearch from '~/components/product/ProductSearch.vue'
import ProductFilters from '~/components/product/ProductFilters.vue'
import ProductSort from '~/components/product/ProductSort.vue'
import { useProducts } from '~/composables/useProducts'

const route = useRoute()
const router = useRouter()
const { products, filterAndSortProducts } = useProducts()
const search = computed(() => String(route.query.search || ''))
const category = computed(() => String(route.query.category || ''))
const sort = computed(() => String(route.query.sort || 'newest'))
const visibleProducts = computed(() => filterAndSortProducts(products, { search: search.value, category: category.value, sort: sort.value }))
const formattedResultCount = computed(() => new Intl.NumberFormat('fa-IR').format(visibleProducts.value.length))

function updateQuery(key, value) {
  const query = { ...route.query }
  if (value && !(key === 'sort' && value === 'newest')) query[key] = value
  else delete query[key]
  router.replace({ path: route.path, query })
}

useHead({ title: 'همه محصولات | NOVA', meta: [{ name: 'description', content: 'مجموعه کفش، کتونی، کیف و اکسسوری NOVA را ببین و انتخابت را پیدا کن.' }] })
</script>

<template>
  <div dir="rtl" class="min-h-screen bg-[#f7f5f0]">
    <SiteHeader />
    <main class="mx-auto w-[min(1320px,calc(100%-32px))] pb-16 pt-6 sm:w-[min(1320px,calc(100%-48px))] sm:pb-24 sm:pt-9">
      <nav class="flex items-center gap-2 text-[10px] text-[#8b877f]" aria-label="مسیر صفحه"><NuxtLink to="/" class="transition-colors hover:text-[#d95d43]">خانه</NuxtLink><span>/</span><span class="text-[#20201e]" aria-current="page">محصولات</span></nav>
      <section class="relative mt-7 overflow-hidden rounded-[1.75rem] bg-[#252421] px-6 py-9 text-white sm:mt-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
        <div class="absolute -left-12 -top-24 h-72 w-72 rounded-full border border-white/10"></div><div class="absolute -left-1 top-0 h-64 w-64 rounded-full border border-white/[0.06]"></div>
        <div class="relative flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><div><span class="mb-3 block text-[9px] font-semibold tracking-[0.25em] text-[#e58a72]" dir="ltr">THE NOVA COLLECTION</span><h1 class="text-3xl font-black leading-[1.5] sm:text-5xl lg:text-6xl">انتخابی برای <span class="text-[#e58a72]">استایل تو.</span></h1><p class="mt-3 max-w-xl text-xs leading-7 text-white/60 sm:text-sm">از انتخاب‌های روزمره تا جزئیاتی متفاوت؛ چیزی را پیدا کن که به تو می‌آید.</p></div><span class="text-[9px] tracking-[0.2em] text-white/45" dir="ltr">CURATED OBJECTS / 2026</span></div>
      </section>
      <section class="mt-7 rounded-2xl border border-[#e7e3db] bg-[#fffefa] p-4 sm:mt-9 sm:p-6" aria-label="جست‌وجو و فیلتر محصولات">
        <div class="grid gap-4 lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.5fr)] lg:items-center"><ProductSearch :model-value="search" @update:model-value="updateQuery('search', $event)" /><ProductFilters :model-value="category" @update:model-value="updateQuery('category', $event)" /></div>
      </section>
      <div class="mb-5 mt-7 flex flex-wrap items-center justify-between gap-4 border-b border-[#e7e3db] pb-4"><p class="text-xs text-[#77756f]" aria-live="polite"><strong class="text-sm text-[#20201e]">{{ formattedResultCount }}</strong> محصول پیدا شد</p><ProductSort :model-value="sort" @update:model-value="updateQuery('sort', $event)" /></div>
      <section v-if="visibleProducts.length" class="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-14 lg:grid-cols-3 xl:grid-cols-4" aria-label="فهرست محصولات"><ProductCard v-for="product in visibleProducts" :key="product.id" :product="product" /></section>
      <section v-else class="flex flex-col items-center rounded-3xl border border-dashed border-[#d8d2c8] bg-[#fffefa] px-5 py-20 text-center"><span class="text-4xl italic text-[#d95d43]">N.</span><h2 class="mt-5 text-xl font-extrabold">چیزی پیدا نشد</h2><p class="mt-2 text-xs leading-7 text-[#77756f]">عبارت جست‌وجو یا دسته‌بندی را تغییر بده و دوباره امتحان کن.</p><button type="button" class="mt-6 rounded-full bg-[#20201e] px-6 py-3 text-xs text-white transition hover:bg-[#d95d43]" @click="router.replace({ path: '/products' })">پاک کردن فیلترها</button></section>
      <div class="mt-12 flex items-center justify-between gap-4 border-t border-[#e7e3db] pt-5 text-[10px] text-[#8b877f]"><span dir="ltr">LESS, BUT BETTER.</span><span>با دقت انتخاب شده، برای استایل تو.</span></div>
    </main>
    <SiteFooter />
  </div>
</template>