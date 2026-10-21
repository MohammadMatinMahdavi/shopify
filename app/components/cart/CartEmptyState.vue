<template>
  <section class="cart-empty">
    <span class="empty-mark" aria-hidden="true">N.</span>
    <span class="empty-eyebrow">A LITTLE ROOM FOR SOMETHING NEW</span>
    <h2>سبد خرید هنوز خالی است</h2>
    <p>چیزی که دوستش داری را پیدا کن؛ هر وقت آماده بودی، به سبدت اضافه‌اش کن.</p>
    <NuxtLink to="/products" class="empty-cta">دیدن محصولات <span aria-hidden="true">←</span></NuxtLink>
  </section>
</template>

<style scoped>
.cart-empty{display:flex;align-items:center;flex-direction:column;padding:clamp(44px,8vw,86px) 22px;border:1px dashed var(--nova-border);border-radius:var(--nova-radius-xl);background:var(--nova-surface);text-align:center}
.empty-mark{color:var(--nova-accent);font:italic 48px Georgia,serif}.empty-eyebrow{margin-top:17px;color:var(--nova-accent);font:9px Arial,sans-serif;letter-spacing:1.3px}
.cart-empty h2{margin:13px 0 6px;font-size:clamp(20px,3vw,27px);font-weight:750}.cart-empty p{max-width:390px;margin:0;color:var(--nova-muted);font-size:12px;line-height:2.1}
.empty-cta{display:inline-flex;align-items:center;gap:24px;margin-top:25px;padding:13px 19px;border-radius:var(--nova-radius-pill);background:var(--nova-ink);color:white;font-size:11px;transition:background .2s}.empty-cta:hover{background:var(--nova-accent)}
</style>
