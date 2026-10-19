<script setup>
import { computed, ref, onBeforeUnmount } from 'vue'
import SiteHeader from '~/components/layout/SiteHeader.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import { useProducts } from '~/composables/useProducts'
import { useCart } from '~/composables/useCart'

const route = useRoute()
const { getProductBySlug } = useProducts()
const { addItem } = useCart()
const product = computed(() => getProductBySlug(String(route.params.slug || '')))
const added = ref(false)
let resetTimer

const formattedPrice = computed(() =>
  product.value ? new Intl.NumberFormat('fa-IR').format(product.value.price) : ''
)

useHead(() => ({
  title: product.value ? product.value.name + ' | NOVA' : 'محصول پیدا نشد | NOVA',
  meta: [{ name: 'description', content: product.value?.description || 'این محصول در مجموعه NOVA پیدا نشد.' }],
}))

function handleAddToCart() {
  if (!product.value) return
  addItem(product.value)
  added.value = true
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => { added.value = false }, 1600)
}

onBeforeUnmount(() => clearTimeout(resetTimer))
</script>

<template>
  <div dir="rtl" class="product-detail-page">
    <SiteHeader />

    <main class="nova-container detail-main">
      <template v-if="product">
        <nav class="breadcrumbs" aria-label="مسیر صفحه">
          <NuxtLink to="/">خانه</NuxtLink><span>/</span><NuxtLink to="/products">محصولات</NuxtLink><span>/</span><span aria-current="page">{{ product.name }}</span>
        </nav>

        <section class="detail-layout">
          <div class="detail-image-wrap">
            <img :src="product.image" :alt="product.name" class="detail-image">
            <span v-if="product.badge" class="detail-badge">{{ product.badge }}</span>
            <span class="detail-image-index" dir="ltr">NOVA / {{ product.number }}</span>
          </div>

          <div class="detail-copy">
            <span class="detail-eyebrow">{{ product.category }} — NOVA EDIT</span>
            <h1>{{ product.name }}</h1>
            <div class="detail-price"><strong>{{ formattedPrice }}</strong><span>تومان</span></div>
            <p class="detail-description">{{ product.description }}</p>

            <div class="detail-divider"></div>
            <div class="detail-meta">
              <span>دسته‌بندی</span>
              <NuxtLink :to="{ path: '/products', query: { category: product.categorySlug } }">{{ product.categoryLabel }}</NuxtLink>
            </div>
            <div class="detail-meta">
              <span>رنگ</span>
              <span class="detail-color"><i :style="{ backgroundColor: product.color }"></i>{{ product.colorName }}</span>
            </div>

            <button type="button" class="detail-add-button" :class="{ added }" @click="handleAddToCart">
              <span>{{ added ? 'به سبد خرید اضافه شد' : 'افزودن به سبد خرید' }}</span>
              <span aria-hidden="true">{{ added ? '✓' : '+' }}</span>
            </button>
            <p class="detail-note">این نسخه نمایشی است؛ پرداخت و ثبت سفارش واقعی فعال نیست.</p>
            <NuxtLink to="/products" class="back-to-products"><span>←</span> بازگشت به همه محصولات</NuxtLink>
          </div>
        </section>

        <section class="detail-bottom-note">
          <span>YOUR STYLE. YOUR RULES.</span>
          <p>انتخابی برای خودت؛ بدون قانون اضافه.</p>
        </section>
      </template>

      <section v-else class="product-not-found">
        <span class="not-found-mark">N.</span>
        <h1>این محصول پیدا نشد</h1>
        <p>ممکن است آدرس اشتباه باشد یا محصول در این مجموعه وجود نداشته باشد.</p>
        <NuxtLink to="/products">مشاهده همه محصولات</NuxtLink>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.product-detail-page{min-height:100vh;background:var(--nova-bg)}
.detail-main{padding-top:26px;padding-bottom:76px}
.breadcrumbs{display:flex;align-items:center;gap:10px;color:var(--nova-muted);font-size:10px;flex-wrap:wrap}
.breadcrumbs a:hover{color:var(--nova-accent)}.breadcrumbs span:last-child{color:var(--nova-ink)}
.detail-layout{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(300px,.8fr);gap:clamp(32px,7vw,100px);align-items:start;padding-top:34px}
.detail-image-wrap{position:relative;overflow:hidden;aspect-ratio:4/5;border-radius:var(--nova-radius-xl);background:var(--nova-surface-soft)}
.detail-image{display:block;width:100%;height:100%;object-fit:cover}
.detail-badge{position:absolute;top:18px;right:18px;padding:9px 14px;border-radius:var(--nova-radius-pill);background:var(--nova-surface);font-size:10px}
.detail-image-index{position:absolute;bottom:18px;left:18px;color:white;font:10px Arial,sans-serif;letter-spacing:1px;text-shadow:0 1px 6px #0008}
.detail-copy{padding-top:22px}
.detail-eyebrow{color:var(--nova-accent);font:9px Arial,sans-serif;letter-spacing:1.6px}
.detail-copy h1{margin:15px 0 10px;font-size:clamp(30px,4vw,44px);line-height:1.55;font-weight:750}
.detail-price{display:flex;align-items:baseline;gap:8px;margin-top:8px}.detail-price strong{font-size:22px;font-weight:750;font-variant-numeric:tabular-nums}.detail-price span{color:var(--nova-muted);font-size:11px}
.detail-description{margin:22px 0 27px;color:var(--nova-muted);font-size:13px;line-height:2.2}
.detail-divider{height:1px;background:var(--nova-border);margin-bottom:12px}
.detail-meta{display:flex;align-items:center;justify-content:space-between;gap:15px;padding:13px 0;border-bottom:1px solid var(--nova-border);font-size:11px}
.detail-meta>span:first-child{color:var(--nova-muted)}
.detail-meta a{border-bottom:1px solid var(--nova-border);padding-bottom:3px}.detail-meta a:hover{color:var(--nova-accent);border-color:var(--nova-accent)}
.detail-color{display:inline-flex;align-items:center;gap:8px}.detail-color i{width:12px;height:12px;border:1px solid #0002;border-radius:50%}
.detail-add-button{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-height:54px;margin-top:27px;padding:0 18px;border:1px solid var(--nova-ink);border-radius:var(--nova-radius-md);background:var(--nova-ink);color:white;font:inherit;font-size:12px;cursor:pointer;transition:background .2s,border-color .2s}
.detail-add-button>span:last-child{font-size:21px}.detail-add-button:hover{background:var(--nova-accent);border-color:var(--nova-accent)}.detail-add-button.added{background:#4d6650;border-color:#4d6650}
.detail-note{margin:12px 0 0;color:var(--nova-muted);font-size:10px;line-height:1.9}
.back-to-products{display:inline-flex;align-items:center;gap:10px;margin-top:24px;font-size:11px}.back-to-products:hover{color:var(--nova-accent)}
.detail-bottom-note{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:62px;padding-top:20px;border-top:1px solid var(--nova-border);color:var(--nova-muted);font-size:10px}
.detail-bottom-note span{font:9px Arial,sans-serif;letter-spacing:1.5px}.detail-bottom-note p{margin:0}
.product-not-found{display:flex;align-items:center;flex-direction:column;text-align:center;padding:90px 18px}
.not-found-mark{color:var(--nova-accent);font:italic 42px Georgia,serif}.product-not-found h1{margin:18px 0 6px;font-size:28px}.product-not-found p{margin:0;color:var(--nova-muted);font-size:12px;line-height:2}
.product-not-found a{margin-top:22px;padding:12px 20px;border-radius:var(--nova-radius-pill);background:var(--nova-ink);color:white;font-size:11px}
@media(max-width:760px){.detail-layout{grid-template-columns:1fr;gap:28px;padding-top:24px}.detail-image-wrap{max-height:650px}.detail-copy{padding-top:0}.detail-copy h1{font-size:32px}.detail-bottom-note{align-items:flex-start;flex-direction:column;gap:8px;margin-top:40px}.detail-main{padding-bottom:50px}}
</style>
