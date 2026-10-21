import { computed, onMounted, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { loadCart, saveCart, mergeCartItems } from '~/services/cartService'

export const useCart = () => {
  const items = useState('nova-cart-items', () => [])
  const drawerOpen = useState('nova-cart-drawer-open', () => false)
  const lastAdded = useState('nova-cart-last-added', () => null)
  const hydrated = useState('nova-cart-hydrated', () => false)
  const activeOwner = useState('nova-cart-owner', () => 'guest')
  const authStore = useAuthStore()
  const userId = computed(() => authStore.user?.id || null)

  const count = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  onMounted(() => {
    if (hydrated.value) return
    activeOwner.value = userId.value || 'guest'
    items.value = loadCart(activeOwner.value)
    hydrated.value = true
  })

  watch(userId, (nextUserId) => {
    if (!hydrated.value) return
    const nextOwner = nextUserId || 'guest'
    if (nextOwner === activeOwner.value) return
    const guestItems = nextUserId && activeOwner.value === 'guest' ? items.value : []
    const savedItems = loadCart(nextOwner)
    activeOwner.value = nextOwner
    items.value = mergeCartItems(savedItems, guestItems)
  }, { flush: 'sync' })

  watch(items, nextItems => {
    if (hydrated.value) saveCart(activeOwner.value, nextItems)
  }, { deep: true })

  function addItem(product) {
    if (!product) return
    const id = product.id ?? product.slug
    const existing = items.value.find(item => String(item.id) === String(id))
    if (existing) existing.quantity += 1
    else items.value.push({
      id, slug: product.slug || String(id), name: product.name,
      price: Math.max(0, Number(product.price) || 0), image: product.image || '',
      category: product.category || '', categoryLabel: product.categoryLabel || product.category || '',
      color: product.color || '#e7e3db', colorName: product.colorName || '', quantity: 1,
    })
    lastAdded.value = product
    drawerOpen.value = true
  }

  function increaseItem(id) {
    const item = items.value.find(entry => String(entry.id) === String(id))
    if (item) item.quantity += 1
  }
  function decreaseItem(id) {
    const item = items.value.find(entry => String(entry.id) === String(id))
    if (item && item.quantity > 1) item.quantity -= 1
  }
  function setQuantity(id, quantity) {
    const item = items.value.find(entry => String(entry.id) === String(id))
    const value = Math.floor(Number(quantity))
    if (item && Number.isFinite(value) && value >= 1) item.quantity = value
  }
  function removeItem(id) { items.value = items.value.filter(item => String(item.id) !== String(id)) }
  function clearCart() { items.value = [] }
  function openDrawer() { drawerOpen.value = true }
  function closeDrawer() { drawerOpen.value = false }

  return { items, count, subtotal, drawerOpen, lastAdded, addItem, increaseItem, decreaseItem, setQuantity, removeItem, clearCart, openDrawer, closeDrawer }
}
