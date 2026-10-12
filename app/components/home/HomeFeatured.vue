
<script setup>
import { ref } from 'vue'
import { useCart } from '~/composables/useCart'

const { addItem } = useCart()
const addedProductId = ref(null)

const products = [
  {
    id: 1,
    number: '01',
    name: 'کتانی مینیمال',
    category: 'SNEAKERS',
    price: 2850000,
    image: '/images/p2.jpg',
    badge: 'تازه رسیده',
    color: '#9B8067',
    colorName: 'قهوه‌ای روشن'
  },
  {
    id: 2,
    number: '02',
    name: 'استایل روزمره',
    category: 'DAILY ESSENTIALS',
    price: 1490000,
    image: '/images/p3.jpg',
    badge: 'انتخاب محبوب',
    color: '#D8C8B5',
    colorName: 'کرم'
  },
  {
    id: 3,
    number: '03',
    name: 'کیف شهری',
    category: 'BAGS',
    price: 1950000,
    image: '/images/p4.jpg',
    badge: 'تازه رسیده',
    color: '#6D5141',
    colorName: 'قهوه‌ای'
  },
  {
    id: 4,
    number: '04',
    name: 'کتانی کلاسیک',
    category: 'FOOTWEAR',
    price: 2100000,
    image: '/images/p5.jpg',
    badge: '',
    color: '#E8E1D6',
    colorName: 'شیری'
  }
]

function formatPrice(price) {
  return new Intl.NumberFormat('fa-IR').format(price)
}

function handleAddToCart(product) {
  addItem(product)
  addedProductId.value = product.id

  setTimeout(() => {
    if (addedProductId.value === product.id) {
      addedProductId.value = null
    }
  }, 1400)
}
</script>

<template>
  <section id="featured" class="featured-section">
    <div class="nova-container">
      <div class="section-heading">
        <div class="section-title-group">
          <span class="section-eyebrow">JUST LANDED — NOVA EDIT</span>
          <h2>تازه‌رسیده‌های <span>ما</span></h2>
          <p class="section-description">
            انتخاب‌های تازه‌ای که ارزش دیده‌شدن دارند.
          </p>
        </div>

        <NuxtLink to="/products?sort=newest" class="view-all">
          مشاهده همه محصولات <span>←</span>
        </NuxtLink>
      </div>

      <div class="products-list">
        <article v-for="product in products" :key="product.id" class="product-card">
          <NuxtLink
            :to="`/products/${product.id}`"
            class="product-image-wrap"
            :aria-label="`مشاهده ${product.name}`"
          >
            <img class="product-image" :src="product.image" :alt="product.name" loading="lazy" />

            <span v-if="product.badge" class="product-badge">{{ product.badge }}</span>
            <span class="product-number">{{ product.number }} / NOVA</span>
            <span class="image-view-link">مشاهده محصول <span>↗</span></span>
          </NuxtLink>

          <div class="product-info">
            <div class="product-details">
              <span class="product-category">{{ product.category }}</span>
              <h3>{{ product.name }}</h3>
            </div>

            <div class="product-price">
              <strong>{{ formatPrice(product.price) }}</strong>
              <span>تومان</span>
            </div>
          </div>

          <div class="product-meta">
            <span class="product-color">
              <span class="color-dot" :style="{ backgroundColor: product.color }"></span>
              {{ product.colorName }}
            </span>
            <span class="product-stock">آماده انتخاب</span>
          </div>

          <button
            type="button"
            class="add-to-cart"
            :class="{ 'is-added': addedProductId === product.id }"
            @click="handleAddToCart(product)"
          >
            <span>{{ addedProductId === product.id ? 'به سبد اضافه شد' : 'افزودن به سبد خرید' }}</span>
            <span class="add-to-cart-icon">{{ addedProductId === product.id ? '✓' : '+' }}</span>
          </button>
        </article>
      </div>

      <div class="featured-bottom">
        <span>کمتر، اما بهتر.</span>
        <NuxtLink to="/products" class="bottom-link">
          کشف مجموعه کامل <span>←</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured-section { padding: 88px 0 74px; background: var(--nova-surface); }
.section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 37px; }
.section-title-group { min-width: 0; }
.section-eyebrow { display: block; margin-bottom: 10px; color: var(--nova-accent); font: 9px Arial, sans-serif; letter-spacing: 1.7px; }
.section-heading h2 { margin: 0; font-size: clamp(30px, 4vw, 45px); line-height: 1.65; font-weight: 750; }
.section-heading h2 span { color: var(--nova-accent); }
.section-description { margin: 6px 0 0; color: var(--nova-muted); font-size: 12px; line-height: 2; }
.view-all, .bottom-link { display: inline-flex; align-items: center; gap: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--nova-border); font-size: 11px; white-space: nowrap; transition: border-color .2s ease, color .2s ease; }
.view-all:hover, .bottom-link:hover { color: var(--nova-accent); border-color: var(--nova-accent); }
.view-all span, .bottom-link span { transition: transform .2s ease; }
.view-all:hover span, .bottom-link:hover span { transform: translateX(-3px); }
.products-list { display: flex; flex-wrap: wrap; gap: 36px 20px; }
.product-card { flex: 1 1 calc(25% - 20px); min-width: 0; max-width: calc(25% - 15px); animation: product-enter .6s both; }
.product-card:nth-child(2) { animation-delay: 80ms; }
.product-card:nth-child(3) { animation-delay: 160ms; }
.product-card:nth-child(4) { animation-delay: 240ms; }
.product-image-wrap { position: relative; display: block; overflow: hidden; aspect-ratio: 3 / 4; background: #eee9e1; }
.product-image { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform .65s cubic-bezier(.2,.7,.2,1), filter .4s ease; }
.product-card:hover .product-image { transform: scale(1.055); filter: saturate(1.04); }
.product-badge { position: absolute; top: 13px; right: 13px; padding: 7px 10px; background: var(--nova-surface); color: var(--nova-ink); font-size: 9px; }
.product-number { position: absolute; bottom: 12px; left: 12px; color: white; font: 9px Arial, sans-serif; letter-spacing: .7px; text-shadow: 0 1px 5px #0009; }
.image-view-link { position: absolute; right: 12px; bottom: 12px; display: inline-flex; align-items: center; gap: 8px; padding: 9px 11px; background: var(--nova-surface); font-size: 9px; opacity: 0; transform: translateY(6px); transition: opacity .25s ease, transform .25s ease; }
.product-card:hover .image-view-link { opacity: 1; transform: translateY(0); }
.product-info { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; padding-top: 16px; }
.product-details { min-width: 0; }
.product-category { color: var(--nova-muted); font: 8px Arial, sans-serif; letter-spacing: 1px; }
.product-details h3 { margin: 6px 0 0; font-size: 13px; font-weight: 700; line-height: 1.8; }
.product-price { display: flex; flex-direction: column; align-items: flex-start; gap: 3px; padding-top: 3px; white-space: nowrap; }
.product-price strong { font-size: 12px; font-weight: 750; font-variant-numeric: tabular-nums; }
.product-price > span { color: var(--nova-muted); font-size: 9px; }
.product-meta { display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-top: 13px; padding-bottom: 13px; border-bottom: 1px solid var(--nova-border); }
.product-color { display: inline-flex; align-items: center; gap: 6px; color: var(--nova-muted); font-size: 9px; }
.color-dot { width: 9px; height: 9px; flex: 0 0 auto; border: 1px solid #0000001a; border-radius: 50%; }
.product-stock { color: #858078; font-size: 9px; }
.add-to-cart { width: 100%; min-height: 43px; margin-top: 12px; padding: 0 12px; display: flex; align-items: center; justify-content: space-between; gap: 10px; border: 1px solid var(--nova-ink); background: transparent; color: var(--nova-ink); font: inherit; font-size: 11px; cursor: pointer; transition: background .2s ease, color .2s ease, border-color .2s ease; }
.add-to-cart-icon { font-size: 19px; line-height: 1; }
.add-to-cart:hover, .add-to-cart.is-added { border-color: var(--nova-ink); background: var(--nova-ink); color: white; }
.add-to-cart.is-added { background: #4d6650; border-color: #4d6650; }
.featured-bottom { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-top: 42px; padding-top: 22px; border-top: 1px solid var(--nova-border); }
.featured-bottom > span { color: var(--nova-muted); font-size: 11px; }
@keyframes product-enter { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 900px) {
  .featured-section { padding-top: 68px; }
  .products-list { gap: 30px 16px; }
  .product-card { flex-basis: calc(50% - 8px); max-width: calc(50% - 8px); }
}
@media (max-width: 560px) {
  .featured-section { padding: 52px 0 44px; }
  .section-heading { align-items: flex-start; flex-direction: column; gap: 16px; margin-bottom: 25px; }
  .section-heading h2 { font-size: 31px; }
  .products-list { gap: 28px 12px; }
  .product-card { flex-basis: calc(50% - 6px); max-width: calc(50% - 6px); }
  .product-info { flex-direction: column; gap: 7px; padding-top: 12px; }
  .product-price { flex-direction: row; align-items: baseline; flex-wrap: wrap; gap: 5px; }
  .product-price strong { font-size: 11px; }
  .product-details h3 { font-size: 12px; }
  .product-meta { align-items: flex-start; flex-direction: column; gap: 7px; }
  .add-to-cart { min-height: 40px; padding: 0 8px; font-size: 10px; }
  .image-view-link { display: none; }
  .featured-bottom { margin-top: 30px; }
}
@keyframes product-enter { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) {
  .product-card { animation: none; }
  .product-image, .image-view-link, .add-to-cart { transition: none; }
}
</style>
