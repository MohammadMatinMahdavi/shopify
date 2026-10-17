<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useCart } from '~/composables/useCart'
const props = defineProps({ product: { type:Object, required:true } })
const { addItem } = useCart()
const added = ref(false)
let resetTimer
function formatPrice(price) { return new Intl.NumberFormat('fa-IR').format(price) }
function handleAddToCart() {
  addItem(props.product); added.value = true; clearTimeout(resetTimer)
  resetTimer = setTimeout(() => { added.value = false }, 1400)
}
onBeforeUnmount(() => clearTimeout(resetTimer))
</script>
<template>
 <article class="product-card">
  <NuxtLink :to="`/products/${product.id}`" class="product-image-wrap" :aria-label="`مشاهده ${product.name}`">
   <img class="product-image" :src="product.image" :alt="product.name" loading="lazy"/>
   <span v-if="product.badge" class="product-badge">{{ product.badge }}</span><span class="product-number">{{ product.number }} / NOVA</span><span class="image-view-link">مشاهده محصول <span>↗</span></span>
  </NuxtLink>
  <div class="product-info"><div class="product-details"><span class="product-category">{{ product.category }}</span><h3>{{ product.name }}</h3></div><div class="product-price"><strong>{{ formatPrice(product.price) }}</strong><span>تومان</span></div></div>
  <div class="product-meta"><span class="product-color"><span class="color-dot" :style="{backgroundColor:product.color}"></span>{{ product.colorName }}</span><span class="product-stock">آماده انتخاب</span></div>
  <button type="button" class="add-to-cart" :class="{'is-added':added}" @click="handleAddToCart"><span>{{ added?'به سبد اضافه شد':'افزودن به سبد خرید' }}</span><span class="add-to-cart-icon">{{ added?'✓':'+' }}</span></button>
 </article>
</template>
<style scoped>
.product-card{min-width:0;animation:product-enter .6s both}.product-card:nth-child(2){animation-delay:80ms}.product-card:nth-child(3){animation-delay:160ms}.product-card:nth-child(4){animation-delay:240ms}
.product-image-wrap{position:relative;display:block;overflow:hidden;aspect-ratio:3/4;border-radius:var(--nova-radius-lg);background:#eee9e1}.product-image{display:block;width:100%;height:100%;object-fit:cover;transition:transform .65s cubic-bezier(.2,.7,.2,1),filter .4s ease}.product-card:hover .product-image{transform:scale(1.055);filter:saturate(1.04)}
.product-badge{position:absolute;top:13px;right:13px;padding:7px 11px;border-radius:var(--nova-radius-pill);background:var(--nova-surface);font-size:9px;box-shadow:0 3px 12px #20201e0c}.product-number{position:absolute;bottom:12px;left:12px;color:white;font:9px Arial,sans-serif;letter-spacing:.7px;text-shadow:0 1px 5px #0009}
.image-view-link{position:absolute;right:12px;bottom:12px;display:inline-flex;gap:8px;padding:9px 12px;border-radius:var(--nova-radius-pill);background:var(--nova-surface);font-size:9px;opacity:0;transform:translateY(6px);transition:opacity .25s,transform .25s}.product-card:hover .image-view-link{opacity:1;transform:translateY(0)}
.product-info{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;padding-top:16px}.product-details{min-width:0}.product-category{color:var(--nova-muted);font:8px Arial,sans-serif;letter-spacing:1px}.product-details h3{margin:6px 0 0;font-size:13px;font-weight:700;line-height:1.8}.product-price{display:flex;flex-direction:column;align-items:flex-start;gap:3px;padding-top:3px;white-space:nowrap}.product-price strong{font-size:12px;font-weight:750;font-variant-numeric:tabular-nums}.product-price>span{color:var(--nova-muted);font-size:9px}
.product-meta{display:flex;align-items:center;justify-content:space-between;gap:6px;margin-top:13px;padding-bottom:13px;border-bottom:1px solid var(--nova-border)}.product-color{display:inline-flex;align-items:center;gap:6px;color:var(--nova-muted);font-size:9px}.color-dot{width:9px;height:9px;flex:0 0 auto;border:1px solid #0000001a;border-radius:50%}.product-stock{color:#858078;font-size:9px}
.add-to-cart{width:100%;min-height:43px;margin-top:12px;padding:0 12px;display:flex;align-items:center;justify-content:space-between;gap:10px;border:1px solid var(--nova-ink);border-radius:13px;background:transparent;color:var(--nova-ink);font:inherit;font-size:11px;cursor:pointer;transition:background .2s,color .2s,border-color .2s}.add-to-cart-icon{font-size:19px;line-height:1}.add-to-cart:hover,.add-to-cart.is-added{border-color:var(--nova-ink);background:var(--nova-ink);color:white}.add-to-cart.is-added{background:#4d6650;border-color:#4d6650}
@keyframes product-enter{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:560px){.product-info{flex-direction:column;gap:7px;padding-top:12px}.product-price{flex-direction:row;align-items:baseline;flex-wrap:wrap;gap:5px}.product-price strong{font-size:11px}.product-details h3{font-size:12px}.product-meta{align-items:flex-start;flex-direction:column;gap:7px}.add-to-cart{min-height:40px;padding:0 8px;font-size:10px}.image-view-link{display:none}}
@media(prefers-reduced-motion:reduce){.product-card{animation:none}.product-image,.image-view-link,.add-to-cart{transition:none}}
</style>
