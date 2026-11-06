<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useCart } from '~/composables/useCart'

const props = defineProps({ product: { type: Object, required: true } })
const { addItem } = useCart()
const added = ref(false)
let resetTimer

function formatPrice(price) {
  return new Intl.NumberFormat('fa-IR').format(price)
}

function handleAddToCart() {
  const addedToCart = addItem(props.product)
  if (!addedToCart) return
  added.value = true
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => { added.value = false }, 1400)
}

onBeforeUnmount(() => clearTimeout(resetTimer))
</script>

<template>
  <article data-gsap-reveal class="group min-w-0">
    <NuxtLink :to="`/products/${product.slug || product.id}`" class="relative block aspect-[4/4.7] overflow-hidden rounded-2xl bg-[#e1e7e0] sm:rounded-[1.4rem]" :aria-label="`مشاهده ${product.name}`">
      <img class="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.055] group-hover:saturate-105" :src="product.image" :alt="product.name" loading="lazy" />
      <span v-if="product.badge" class="absolute right-3 top-3 rounded-full bg-[#f7eee7]/95 px-3 py-2 text-[9px] text-[#20201e] shadow-sm">{{ product.badge }}</span>
      <span class="absolute bottom-3 left-3 text-[9px] tracking-wider text-white [text-shadow:0_1px_5px_#0009]" dir="ltr">{{ product.number }} / NOVA</span>
      <span class="absolute bottom-3 right-3 hidden translate-y-2 items-center gap-2 rounded-full bg-[#fffefa] px-3 py-2 text-[10px] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:inline-flex">مشاهده محصول <span>↗</span></span>
    </NuxtLink>
    <div class="flex items-start justify-between gap-2 pt-3 sm:pt-4">
      <div class="min-w-0"><span class="text-[9px] tracking-wider text-[#8b877f]" dir="ltr">{{ product.category }}</span><h3 class="mt-1 truncate text-xs font-bold leading-7 text-[#20201e] sm:text-sm">{{ product.name }}</h3></div>
      <div class="flex shrink-0 flex-col items-start gap-0.5 pt-1"><strong class="text-xs font-extrabold tabular-nums text-[#20201e] sm:text-sm">{{ formatPrice(product.price) }}</strong><span class="text-[9px] text-[#77756f]">تومان</span></div>
    </div>
    <div class="mt-2 flex items-center justify-between gap-2 border-b border-[#d8cec5] pb-3"><span class="inline-flex items-center gap-2 text-[9px] text-[#77756f]"><span class="h-2.5 w-2.5 rounded-full border border-black/10" :style="{ backgroundColor: product.color }"></span>{{ product.colorName }}</span></div>
    <button type="button" class="mt-3 flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-[#20201e] px-3 text-[10px] font-medium text-[#20201e] transition duration-200 hover:bg-[#20201e] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d95d43] sm:min-h-12 sm:px-4 sm:text-xs" :class="{ 'border-[#4d6650] bg-[#4d6650] text-white hover:border-[#4d6650] hover:bg-[#4d6650]': added }" @click="handleAddToCart"><span>{{ added ? 'به سبد اضافه شد' : 'افزودن به سبد خرید' }}</span><span class="text-lg leading-none">{{ added ? '✓' : '+' }}</span></button>
  </article>
</template>