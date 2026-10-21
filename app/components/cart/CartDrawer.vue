<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import CartItem from '~/components/cart/CartItem.vue'
import CartSummary from '~/components/cart/CartSummary.vue'
import { useCart } from '~/composables/useCart'

const { items, count, subtotal, drawerOpen, increaseItem, decreaseItem, removeItem, closeDrawer } = useCart()
const closeButton = ref(null)
const previousFocus = ref(null)

function onKeydown(event) {
  if (event.key === 'Escape' && drawerOpen.value) closeDrawer()
}

watch(drawerOpen, async isOpen => {
  if (!import.meta.client) return
  if (isOpen) {
    previousFocus.value = document.activeElement
    document.body.style.overflow = 'hidden'
    await nextTick()
    closeButton.value?.focus()
  } else {
    document.body.style.overflow = ''
    if (previousFocus.value && typeof previousFocus.value.focus === 'function') previousFocus.value.focus()
  }
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="cart-drawer">
      <div v-if="drawerOpen" class="cart-overlay" @click.self="closeDrawer">
        <aside class="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title" dir="rtl">
          <header class="drawer-header">
            <div><span class="drawer-eyebrow">YOUR PICKS, IN ONE PLACE</span><h2 id="cart-drawer-title">سبد خرید <span>({{ new Intl.NumberFormat('fa-IR').format(count) }})</span></h2></div>
            <button ref="closeButton" type="button" class="drawer-close" aria-label="بستن سبد خرید" @click="closeDrawer">×</button>
          </header>
          <div v-if="items.length" class="drawer-content">
            <p class="drawer-helper">انتخاب‌هایت را بررسی کن؛ هر زمان خواستی می‌توانی تعداد را تغییر بدهی.</p>
            <div class="drawer-items">
              <CartItem v-for="item in items" :key="item.id" :item="item" compact @increase="increaseItem" @decrease="decreaseItem" @remove="removeItem" />
            </div>
            <CartSummary :subtotal="subtotal" :count="count" compact />
          </div>
          <div v-else class="drawer-empty">
            <span class="drawer-empty-mark">N.</span><h3>سبدت هنوز خالی است</h3><p>محصولی که دوست داری به اینجا اضافه کن.</p>
            <NuxtLink to="/products" class="drawer-primary" @click="closeDrawer">دیدن محصولات</NuxtLink>
          </div>
          <footer v-if="items.length" class="drawer-footer">
            <NuxtLink to="/cart" class="drawer-primary" @click="closeDrawer">مشاهده سبد خرید <span>←</span></NuxtLink>
            <button type="button" class="drawer-secondary" @click="closeDrawer">ادامه خرید</button>
          </footer>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.cart-overlay{position:fixed;inset:0;z-index:999;display:flex;justify-content:flex-start;background:rgb(25 24 22 / 42%);backdrop-filter:blur(3px)}
.cart-drawer{display:flex;flex-direction:column;width:min(470px,100%);height:100%;max-height:100dvh;background:var(--nova-bg);box-shadow:24px 0 70px #0002;overflow:hidden}
.drawer-header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:24px 25px 20px;border-bottom:1px solid var(--nova-border);background:var(--nova-surface)}
.drawer-eyebrow{color:var(--nova-accent);font:8px Arial,sans-serif;letter-spacing:1.4px}.drawer-header h2{margin:8px 0 0;font-size:20px;font-weight:800}.drawer-header h2 span{color:var(--nova-muted);font-size:12px;font-weight:500}
.drawer-close{width:38px;height:38px;display:grid;place-items:center;border:1px solid var(--nova-border);border-radius:50%;background:transparent;font-size:25px;line-height:1;cursor:pointer}.drawer-close:hover{background:var(--nova-surface-soft)}
.drawer-content{flex:1;overflow-y:auto;padding:0 25px 22px}.drawer-helper{margin:18px 0 0;color:var(--nova-muted);font-size:10px;line-height:1.9}.drawer-items{margin-bottom:19px}
.drawer-footer{display:flex;flex-direction:column;gap:11px;padding:17px 25px max(18px,env(safe-area-inset-bottom));border-top:1px solid var(--nova-border);background:var(--nova-surface)}
.drawer-primary{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:48px;padding:0 17px;border:0;border-radius:13px;background:var(--nova-ink);color:white;font:inherit;font-size:12px;cursor:pointer;transition:background .2s}.drawer-primary:hover{background:var(--nova-accent)}.drawer-primary span{font-size:18px}
.drawer-secondary{min-height:38px;border:0;background:transparent;color:var(--nova-muted);font:inherit;font-size:11px;cursor:pointer}.drawer-secondary:hover{color:var(--nova-ink)}
.drawer-empty{flex:1;display:flex;align-items:center;flex-direction:column;justify-content:center;padding:30px;text-align:center}.drawer-empty-mark{color:var(--nova-accent);font:italic 46px Georgia,serif}.drawer-empty h3{margin:16px 0 5px;font-size:20px}.drawer-empty p{margin:0;color:var(--nova-muted);font-size:11px}.drawer-empty .drawer-primary{width:100%;justify-content:center;margin-top:22px}
.cart-drawer-enter-active,.cart-drawer-leave-active{transition:opacity .24s ease}.cart-drawer-enter-active .cart-drawer,.cart-drawer-leave-active .cart-drawer{transition:transform .28s cubic-bezier(.2,.7,.2,1)}
.cart-drawer-enter-from,.cart-drawer-leave-to{opacity:0}.cart-drawer-enter-from .cart-drawer,.cart-drawer-leave-to .cart-drawer{transform:translateX(-30px)}
@media(max-width:520px){.drawer-header{padding:19px 17px 16px}.drawer-content{padding-right:17px;padding-left:17px}.drawer-footer{padding-right:17px;padding-left:17px}.cart-drawer{width:100%}}
@media(prefers-reduced-motion:reduce){.cart-drawer-enter-active,.cart-drawer-leave-active,.cart-drawer-enter-active .cart-drawer,.cart-drawer-leave-active .cart-drawer{transition:none}}
</style>
