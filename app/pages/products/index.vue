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

const visibleProducts = computed(() => filterAndSortProducts(products, {
  search: search.value,
  category: category.value,
  sort: sort.value,
}))
const formattedResultCount = computed(() => new Intl.NumberFormat('fa-IR').format(visibleProducts.value.length))

function updateQuery(key, value) {
  const query = { ...route.query }
  if (value && !(key === 'sort' && value === 'newest')) query[key] = value
  else delete query[key]
  router.replace({ path: route.path, query })
}

useHead({
  title: 'همه محصولات | NOVA',
  meta: [{ name: 'description', content: 'مجموعه کفش، کتونی، کیف و اکسسوری NOVA را ببین و انتخابت را پیدا کن.' }],
})
</script>

<template>
  <div dir="rtl" class="catalog-page">
    <SiteHeader />

    <main class="nova-container catalog-main">
      <nav class="breadcrumbs" aria-label="مسیر صفحه">
        <NuxtLink to="/">خانه</NuxtLink><span>/</span><span aria-current="page">محصولات</span>
      </nav>


      <section class="catalog-controls" aria-label="جست‌وجو و فیلتر محصولات">
        <ProductSearch :model-value="search" @update:model-value="updateQuery('search', $event)" />
        <ProductFilters :model-value="category" @update:model-value="updateQuery('category', $event)" />
      </section>

      <div class="catalog-results">
        <p aria-live="polite"><strong>{{ formattedResultCount }}</strong> محصول پیدا شد</p>
        <ProductSort :model-value="sort" @update:model-value="updateQuery('sort', $event)" />
      </div>

      <section v-if="visibleProducts.length" class="catalog-grid" aria-label="فهرست محصولات">
        <ProductCard v-for="product in visibleProducts" :key="product.id" :product="product" />
      </section>

      <section v-else class="catalog-empty">
        <span class="empty-mark">N.</span>
        <h2>چیزی پیدا نشد</h2>
        <p>عبارت جست‌وجو یا دسته‌بندی را تغییر بده و دوباره امتحان کن.</p>
        <button type="button" @click="router.replace({ path: '/products' })">پاک کردن فیلترها</button>
      </section>

      <div class="catalog-footer-note"><span>LESS, BUT BETTER.</span><span>با دقت انتخاب شده، برای استایل تو.</span></div>
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.catalog-page{min-height:100vh;background:var(--nova-bg)}
.catalog-main{padding-top:26px;padding-bottom:84px}
.breadcrumbs{display:flex;align-items:center;gap:10px;color:var(--nova-muted);font-size:10px}
.breadcrumbs a:hover{color:var(--nova-accent)}.breadcrumbs span:last-child{color:var(--nova-ink)}
.catalog-intro{display:flex;align-items:flex-end;justify-content:space-between;gap:28px;padding:48px 0 34px;border-bottom:1px solid var(--nova-border)}
.catalog-eyebrow{display:block;margin-bottom:12px;color:var(--nova-accent);font:9px Arial,sans-serif;letter-spacing:1.8px}
.catalog-intro h1{margin:0;font-size:clamp(35px,5vw,60px);font-weight:750;line-height:1.5;letter-spacing:-1.5px}
.catalog-intro h1 em{color:var(--nova-accent);font-style:normal}
.catalog-intro p{margin:8px 0 0;color:var(--nova-muted);font-size:12px;line-height:2}
.catalog-index{padding-bottom:7px;color:var(--nova-muted);font:10px Arial,sans-serif;letter-spacing:1px;white-space:nowrap}
.catalog-controls{display:grid;grid-template-columns:minmax(220px, .8fr) minmax(0,1.4fr);align-items:center;gap:20px;padding:25px 0 20px}
.catalog-results{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:22px;padding-top:18px;border-top:1px solid var(--nova-border)}
.catalog-results p{margin:0;color:var(--nova-muted);font-size:11px}.catalog-results strong{color:var(--nova-ink);font-size:13px}
.catalog-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:42px 22px}
.catalog-empty{display:flex;align-items:center;flex-direction:column;padding:80px 20px;text-align:center;border:1px dashed var(--nova-border);border-radius:var(--nova-radius-xl);background:var(--nova-surface)}
.empty-mark{color:var(--nova-accent);font:italic 38px Georgia,serif}.catalog-empty h2{margin:16px 0 4px;font-size:22px}.catalog-empty p{margin:0;color:var(--nova-muted);font-size:12px;line-height:2}
.catalog-empty button{margin-top:22px;padding:11px 18px;border:0;border-radius:var(--nova-radius-pill);background:var(--nova-ink);color:white;font:inherit;font-size:11px;cursor:pointer}
.catalog-footer-note{display:flex;justify-content:space-between;gap:16px;margin-top:48px;padding-top:18px;border-top:1px solid var(--nova-border);color:var(--nova-muted);font-size:10px}
.catalog-footer-note span:first-child{font:9px Arial,sans-serif;letter-spacing:1.4px}
@media(max-width:1050px){.catalog-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:34px 18px}.catalog-controls{grid-template-columns:1fr}.catalog-intro{padding-top:38px}}
@media(max-width:760px){.catalog-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:30px 14px}.catalog-intro{align-items:flex-start;flex-direction:column;gap:15px}.catalog-intro h1{font-size:clamp(34px,8vw,48px)}.catalog-main{padding-bottom:54px}.catalog-controls{gap:15px}.catalog-footer-note{margin-top:34px}}
@media(max-width:420px){.catalog-grid{gap:26px 10px}.catalog-main{padding-top:20px}.catalog-intro{padding-top:30px}.catalog-index{font-size:9px}}
</style>
