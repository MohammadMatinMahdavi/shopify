<script setup>
defineProps({ subtotal: { type: Number, default: 0 }, count: { type: Number, default: 0 }, compact: { type: Boolean, default: false } })
const formatPrice = value => new Intl.NumberFormat('fa-IR').format(value)
</script>

<template>
  <section class="cart-summary" :class="{ 'is-compact': compact }" aria-label="خلاصه سبد خرید">
    <h2>خلاصه سفارش</h2>
    <div class="summary-line"><span>تعداد کالا</span><strong>{{ new Intl.NumberFormat('fa-IR').format(count) }} عدد</strong></div>
    <div class="summary-line"><span>جمع کالاها</span><strong>{{ formatPrice(subtotal) }} <small>تومان</small></strong></div>
    <div class="summary-total"><span>مبلغ قابل پرداخت</span><div><strong>{{ formatPrice(subtotal) }}</strong><small>تومان</small></div></div>
    <p class="summary-note"><span aria-hidden="true">ⓘ</span> هزینه ارسال و مبلغ نهایی در نسخه واقعی، پس از اتصال سرویس سفارش محاسبه می‌شود.</p>
  </section>
</template>

<style scoped>
.cart-summary{padding:24px;border:1px solid var(--nova-border);border-radius:var(--nova-radius-lg);background:var(--nova-surface)}
.cart-summary h2{margin:0 0 22px;font-size:16px;font-weight:750}
.summary-line{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:15px 0;color:var(--nova-muted);font-size:11px}
.summary-line strong{color:var(--nova-ink);font-size:11px;font-weight:650}.summary-line small,.summary-total small{color:var(--nova-muted);font-size:9px;font-weight:400}
.summary-total{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-top:20px;padding-top:20px;border-top:1px solid var(--nova-border);font-size:12px}
.summary-total>div{display:flex;align-items:baseline;gap:6px;white-space:nowrap}.summary-total strong{font-size:20px;font-weight:800;font-variant-numeric:tabular-nums}
.summary-note{display:flex;align-items:flex-start;gap:8px;margin:18px 0 0;color:var(--nova-muted);font-size:10px;line-height:1.9}.summary-note span{color:var(--nova-accent)}
.is-compact{padding:19px;border-radius:16px}.is-compact h2{margin-bottom:15px;font-size:14px}.is-compact .summary-line{margin:11px 0}.is-compact .summary-total{margin-top:15px;padding-top:15px}.is-compact .summary-total strong{font-size:17px}.is-compact .summary-note{margin-top:13px;font-size:9px}
</style>
