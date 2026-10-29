<script setup>
import SiteHeader from '~/components/layout/SiteHeader.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import CartItem from '~/components/cart/CartItem.vue'
import CartSummary from '~/components/cart/CartSummary.vue'
import CartEmptyState from '~/components/cart/CartEmptyState.vue'
import { useCart } from '~/composables/useCart'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const authReady = ref(false)
const { items, count, subtotal, increaseItem, decreaseItem, removeItem, clearCart } = useCart()
onMounted(async () => {
  try {
    const { $supabase } = useNuxtApp()
    if ($supabase) await authStore.initialize($supabase)
  } finally {
    authReady.value = true
  }
})
useHead({ title: 'سبد خرید | NOVA', meta: [{ name: 'description', content: 'انتخاب‌هایت را در سبد خرید NOVA بررسی و مدیریت کن.' }] })
</script>

<template>
  <div dir="rtl" class="cart-page">
    <SiteHeader />
    <main class="nova-container cart-main">
      <section v-if="!authReady" class="cart-access-state" aria-live="polite"><span class="access-mark">N.</span><p>در حال بررسی وضعیت حساب کاربری...</p></section>
      <section v-else-if="!authStore.isAuthenticated" class="cart-access-state" aria-labelledby="cart-access-title">
        <span class="access-mark">N.</span><span class="access-eyebrow">YOUR NOVA ACCOUNT</span>
        <h1 id="cart-access-title">برای دیدن سبد خرید وارد شو</h1>
        <p>سبد خرید و انتخاب‌هایت پس از ورود به حساب کاربری در دسترس تو قرار می‌گیرند.</p>
        <NuxtLink to="/auth?redirect=/cart" class="access-cta">ورود / ثبت‌نام <span>←</span></NuxtLink>
        <NuxtLink to="/products" class="access-back">بازگشت به محصولات</NuxtLink>
      </section>
      <template v-else>
      <nav class="breadcrumbs" aria-label="مسیر صفحه"><NuxtLink to="/">خانه</NuxtLink><span>/</span><span aria-current="page">سبد خرید</span></nav>
      <section class="cart-heading">
        <div><span class="cart-eyebrow">YOUR SELECTION, YOUR STYLE</span><h1>سبد <em>خرید</em></h1><p>قبل از ادامه، انتخاب‌هایت را یک بار دیگر مرور کن.</p></div>
        <span class="cart-step" dir="ltr"><b>01</b><i></i><span>02</span><i></i><span>03</span></span>
      </section>
      <section v-if="items.length" class="cart-layout">
        <div class="cart-items-panel">
          <div class="items-panel-heading"><h2>محصولات انتخاب‌شده <span>({{ new Intl.NumberFormat('fa-IR').format(count) }})</span></h2><button type="button" @click="clearCart">خالی کردن سبد</button></div>
          <CartItem v-for="item in items" :key="item.id" :item="item" @increase="increaseItem" @decrease="decreaseItem" @remove="removeItem" />
          <NuxtLink to="/products" class="continue-shopping"><span>←</span> ادامه خرید و دیدن محصولات</NuxtLink>
        </div>
        <aside class="cart-sidebar">
          <CartSummary :subtotal="subtotal" :count="count" />
          <div class="checkout-notice"><span class="notice-icon" aria-hidden="true">i</span><p><strong>این فروشگاه در حال آماده‌سازی است.</strong> پرداخت و ثبت سفارش واقعی هنوز فعال نیست؛ این صفحه برای نمایش و آزمایش تجربه خرید ساخته شده است.</p></div>
          <button type="button" class="checkout-button" disabled aria-describedby="checkout-help">پرداخت آنلاین <span>↗</span></button>
          <p id="checkout-help" class="checkout-help">پس از اتصال بک‌اند و درگاه پرداخت فعال می‌شود.</p>
        </aside>
      </section>
      <CartEmptyState v-else />
      <div class="cart-bottom-note"><span>LESS, BUT BETTER.</span><span>با دقت انتخاب شده، برای استایل تو.</span></div>
      </template>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
 .cart-page{min-height:100vh;background:var(--nova-bg)}.cart-main{padding-top:26px;padding-bottom:78px}
.cart-access-state{min-height:55vh;display:flex;align-items:center;flex-direction:column;justify-content:center;padding:40px 20px;text-align:center}.access-mark{color:var(--nova-accent);font:italic 48px Georgia,serif}.access-eyebrow{margin-top:12px;color:var(--nova-accent);font:9px Arial,sans-serif;letter-spacing:1.5px}.cart-access-state h1{margin:12px 0 8px;font-size:clamp(24px,4vw,36px);font-weight:800}.cart-access-state p{max-width:430px;margin:0;color:var(--nova-muted);font-size:12px;line-height:2}.access-cta{display:flex;align-items:center;justify-content:space-between;gap:35px;min-height:48px;margin-top:22px;padding:0 18px;border-radius:13px;background:var(--nova-ink);color:white;font-size:12px}.access-cta:hover{background:var(--nova-accent)}.access-back{margin-top:15px;color:var(--nova-muted);font-size:11px}.access-back:hover{color:var(--nova-ink)}
.breadcrumbs{display:flex;align-items:center;gap:10px;color:var(--nova-muted);font-size:10px}.breadcrumbs a:hover{color:var(--nova-accent)}.breadcrumbs span:last-child{color:var(--nova-ink)}
.cart-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;padding:42px 0 32px;border-bottom:1px solid var(--nova-border)}
.cart-eyebrow{color:var(--nova-accent);font:9px Arial,sans-serif;letter-spacing:1.5px}.cart-heading h1{margin:9px 0 4px;font-size:clamp(36px,5vw,57px);font-weight:800;line-height:1.4;letter-spacing:-1px}.cart-heading h1 em{color:var(--nova-accent);font-style:normal}.cart-heading p{margin:0;color:var(--nova-muted);font-size:12px;line-height:2}
.cart-step{display:flex;align-items:center;gap:10px;padding-bottom:7px;color:#b4afa5;font:10px Arial,sans-serif;letter-spacing:.6px}.cart-step b{color:var(--nova-accent);font-weight:700}.cart-step i{width:28px;height:1px;background:var(--nova-border)}
.cart-layout{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(280px,.75fr);align-items:start;gap:clamp(24px,4vw,54px);padding-top:30px}
.cart-items-panel{min-width:0;padding:0 24px 24px;border:1px solid var(--nova-border);border-radius:var(--nova-radius-lg);background:var(--nova-surface)}
.items-panel-heading{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:22px 0 4px}.items-panel-heading h2{margin:0;font-size:14px;font-weight:750}.items-panel-heading h2 span{color:var(--nova-muted);font-size:11px;font-weight:500}
.items-panel-heading button{border:0;background:transparent;color:var(--nova-muted);font:inherit;font-size:10px;text-decoration:underline;text-underline-offset:4px;cursor:pointer}.items-panel-heading button:hover{color:#b44434}
.continue-shopping{display:inline-flex;align-items:center;gap:10px;margin-top:22px;color:var(--nova-muted);font-size:11px;transition:color .2s}.continue-shopping span{font-size:17px}.continue-shopping:hover{color:var(--nova-accent)}
.cart-sidebar{position:sticky;top:24px}.checkout-notice{display:flex;align-items:flex-start;gap:10px;margin-top:15px;padding:14px;border:1px solid #ead7cc;border-radius:14px;background:#fbf0e9}
.notice-icon{width:19px;height:19px;display:grid;place-items:center;flex:0 0 auto;border:1px solid #d9a28f;border-radius:50%;color:#a54c38;font:11px Georgia,serif}
.checkout-notice p{margin:0;color:#775f55;font-size:10px;line-height:1.9}.checkout-notice strong{display:block;margin-bottom:3px;color:#563c32;font-weight:750}
.checkout-button{width:100%;min-height:49px;display:flex;align-items:center;justify-content:space-between;margin-top:16px;padding:0 17px;border:0;border-radius:13px;background:#c7c2b8;color:#fffefa;font:inherit;font-size:12px;cursor:not-allowed}
.checkout-help{margin:9px 0 0;color:var(--nova-muted);font-size:9px;line-height:1.8;text-align:center}
.cart-bottom-note{display:flex;justify-content:space-between;gap:16px;margin-top:50px;padding-top:18px;border-top:1px solid var(--nova-border);color:var(--nova-muted);font-size:10px}.cart-bottom-note span:first-child{font:9px Arial,sans-serif;letter-spacing:1.4px}
@media(max-width:850px){.cart-layout{grid-template-columns:minmax(0,1fr)}.cart-sidebar{position:static}}
@media(max-width:560px){.cart-main{padding-top:20px;padding-bottom:52px}.cart-heading{align-items:flex-start;flex-direction:column;gap:18px;padding:30px 0 24px}.cart-heading h1{font-size:40px}.cart-layout{padding-top:20px;gap:22px}.cart-items-panel{padding-right:14px;padding-left:14px}.items-panel-heading{align-items:flex-start}.items-panel-heading h2{font-size:12px}.cart-bottom-note{flex-direction:column;gap:7px;margin-top:34px}}
</style>
