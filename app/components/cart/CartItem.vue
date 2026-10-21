<script setup>
defineProps({ item: { type: Object, required: true }, compact: { type: Boolean, default: false } })
const emit = defineEmits(['increase', 'decrease', 'remove'])
const formatPrice = value => new Intl.NumberFormat('fa-IR').format(value)
</script>

<template>
  <article class="cart-item" :class="{ 'is-compact': compact }">
    <NuxtLink :to="`/products/${item.slug}`" class="cart-item-image" :aria-label="`مشاهده ${item.name}`">
      <img :src="item.image" :alt="item.name" loading="lazy">
    </NuxtLink>
    <div class="cart-item-main">
      <div class="cart-item-heading">
        <div>
          <span v-if="item.categoryLabel || item.category" class="cart-item-category">{{ item.categoryLabel || item.category }}</span>
          <NuxtLink :to="`/products/${item.slug}`" class="cart-item-name">{{ item.name }}</NuxtLink>
          <span v-if="item.colorName" class="cart-item-color"><i :style="{ backgroundColor: item.color }"></i>{{ item.colorName }}</span>
        </div>
        <button class="remove-item" type="button" :aria-label="`حذف ${item.name} از سبد خرید`" @click="emit('remove', item.id)">حذف</button>
      </div>
      <div class="cart-item-bottom">
        <div class="quantity-control" :aria-label="`تعداد ${item.name}`">
          <button type="button" :disabled="item.quantity <= 1" :aria-label="`کاهش تعداد ${item.name}`" @click="emit('decrease', item.id)">−</button>
          <span aria-live="polite">{{ new Intl.NumberFormat('fa-IR').format(item.quantity) }}</span>
          <button type="button" :aria-label="`افزایش تعداد ${item.name}`" @click="emit('increase', item.id)">+</button>
        </div>
        <div class="cart-item-price"><strong>{{ formatPrice(item.price * item.quantity) }}</strong><span>تومان</span></div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.cart-item{display:flex;align-items:stretch;gap:18px;padding:20px 0;border-bottom:1px solid var(--nova-border);min-width:0}
.cart-item-image{display:block;flex:0 0 118px;overflow:hidden;aspect-ratio:4/5;border-radius:14px;background:var(--nova-surface-soft)}
.cart-item-image img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .35s ease}
.cart-item-image:hover img{transform:scale(1.04)}
.cart-item-main{display:flex;flex:1;flex-direction:column;justify-content:space-between;gap:20px;min-width:0}
.cart-item-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:14px}
.cart-item-heading>div{display:flex;flex-direction:column;align-items:flex-start;gap:6px;min-width:0}
.cart-item-category{color:var(--nova-muted);font:9px Arial,sans-serif;letter-spacing:.7px}
.cart-item-name{font-size:14px;font-weight:700;line-height:1.8}.cart-item-name:hover{color:var(--nova-accent)}
.cart-item-color{display:inline-flex;align-items:center;gap:7px;color:var(--nova-muted);font-size:10px}.cart-item-color i{width:10px;height:10px;border:1px solid #0002;border-radius:50%}
.remove-item{flex:0 0 auto;padding:4px 0;border:0;background:transparent;color:var(--nova-muted);font:inherit;font-size:10px;cursor:pointer;text-decoration:underline;text-underline-offset:4px}.remove-item:hover{color:#b44434}
.cart-item-bottom{display:flex;align-items:center;justify-content:space-between;gap:12px}
.quantity-control{display:flex;align-items:center;gap:14px;min-height:38px;padding:0 9px;border:1px solid var(--nova-border);border-radius:11px;background:var(--nova-surface)}
.quantity-control button{width:22px;height:28px;border:0;background:transparent;color:var(--nova-ink);font-size:18px;cursor:pointer}.quantity-control button:disabled{color:#c7c2b8;cursor:not-allowed}
.quantity-control span{min-width:18px;text-align:center;font-size:11px;font-variant-numeric:tabular-nums}
.cart-item-price{display:flex;align-items:baseline;gap:6px;white-space:nowrap}.cart-item-price strong{font-size:13px;font-weight:750;font-variant-numeric:tabular-nums}.cart-item-price span{color:var(--nova-muted);font-size:9px}
.is-compact{gap:12px;padding:15px 0}.is-compact .cart-item-image{flex-basis:78px;border-radius:11px}.is-compact .cart-item-name{font-size:12px}.is-compact .cart-item-main{gap:12px}.is-compact .cart-item-bottom{align-items:flex-end}.is-compact .cart-item-price strong{font-size:11px}.is-compact .quantity-control{min-height:31px;gap:9px;padding:0 5px}.is-compact .quantity-control button{width:19px;height:24px;font-size:16px}
@media(max-width:520px){.cart-item{gap:12px;padding:16px 0}.cart-item-image{flex-basis:92px}.cart-item-name{font-size:12px}.cart-item-bottom{align-items:flex-start;flex-direction:column;gap:10px}.cart-item-price strong{font-size:12px}.cart-item-heading{gap:8px}}
</style>
