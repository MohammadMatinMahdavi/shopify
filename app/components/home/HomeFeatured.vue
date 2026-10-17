<script setup>
import { featuredProducts } from '~/data/products'
import ProductCard from '~/components/product/ProductCard.vue'
</script>
<template>
 <section id="featured" class="featured-section" dir="rtl"><div class="nova-container">
  <div class="section-heading"><div class="section-title-group"><span class="section-eyebrow">JUST LANDED — NOVA EDIT</span><h2>تازه‌رسیده‌های <span>ما</span></h2><p class="section-description">انتخاب‌های تازه‌ای که ارزش دیده‌شدن دارند.</p></div><NuxtLink to="/products?sort=newest" class="view-all">مشاهده همه محصولات <span>←</span></NuxtLink></div>
  <div class="products-list"><ProductCard v-for="product in featuredProducts" :key="product.id" :product="product"/></div>
  <div class="featured-bottom"><span>کمتر، اما بهتر.</span><NuxtLink to="/products" class="bottom-link">کشف مجموعه کامل <span>←</span></NuxtLink></div>
 </div></section>
</template>
<style scoped>
.featured-section{padding:88px 0 74px;background:var(--nova-surface)}.section-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-bottom:37px}.section-title-group{min-width:0}.section-eyebrow{display:block;margin-bottom:10px;color:var(--nova-accent);font:9px Arial,sans-serif;letter-spacing:1.7px}.section-heading h2{margin:0;font-size:clamp(30px,4vw,45px);line-height:1.65;font-weight:750}.section-heading h2 span{color:var(--nova-accent)}.section-description{margin:6px 0 0;color:var(--nova-muted);font-size:12px;line-height:2}
.view-all,.bottom-link{display:inline-flex;align-items:center;gap:12px;padding-bottom:8px;border-bottom:1px solid var(--nova-border);font-size:11px;white-space:nowrap;transition:border-color .2s,color .2s}.view-all:hover,.bottom-link:hover{color:var(--nova-accent);border-color:var(--nova-accent)}.view-all span,.bottom-link span{transition:transform .2s}.view-all:hover span,.bottom-link:hover span{transform:translateX(-3px)}
.products-list{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:34px 20px}.featured-bottom{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:42px;padding-top:22px;border-top:1px solid var(--nova-border)}.featured-bottom>span{color:var(--nova-muted);font-size:11px}
@media(max-width:900px){.featured-section{padding-top:68px}.products-list{grid-template-columns:repeat(2,minmax(0,1fr));gap:30px 16px}}@media(max-width:560px){.featured-section{padding:52px 0 44px}.section-heading{align-items:flex-start;flex-direction:column;gap:16px;margin-bottom:25px}.section-heading h2{font-size:31px}.products-list{gap:28px 12px}.featured-bottom{margin-top:30px}}
</style>
