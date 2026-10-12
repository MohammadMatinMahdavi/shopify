```vue
<template>
  <section id="featured" class="featured-section">
    <div class="nova-container">
      <!-- عنوان بخش -->
      <div class="section-heading">
        <div class="section-title-group">
          <span class="section-eyebrow">CURATED FOR YOU</span>

          <h2>
            انتخاب‌های
            <span>این هفته</span>
          </h2>

          <p class="section-description">
            قطعاتی خاص برای استایلی که امضای خودت را دارد.
          </p>
        </div>

        <NuxtLink to="/products" class="view-all">
          مشاهده همه محصولات
          <span aria-hidden="true">←</span>
        </NuxtLink>
      </div>

      <!-- کارت‌های محصول -->
      <div class="products-list">
        <article
          v-for="product in products"
          :key="product.id"
          class="product-card"
        >
          <div class="product-image-wrap">
            <img
              class="product-image"
              :src="product.image"
              :alt="product.name"
              loading="lazy"
            />

            <span
              v-if="product.badge"
              class="product-badge"
            >
              {{ product.badge }}
            </span>

            <span class="product-number">
              {{ product.number }}
            </span>
          </div>

          <div class="product-info">
            <div class="product-details">
              <h3>{{ product.name }}</h3>
              <p>{{ product.category }}</p>
            </div>

            <div class="product-price">
              <span>{{ product.price }}</span>
              <span class="price-currency">تومان</span>
            </div>
          </div>

          <div class="product-footer">
            <span class="product-color">
              <span
                class="color-dot"
                :style="{ backgroundColor: product.color }"
              ></span>
              {{ product.colorName }}
            </span>

            <span class="product-arrow" aria-hidden="true">↗</span>
          </div>
        </article>
      </div>

      <!-- لینک پایین بخش -->
      <div class="featured-bottom">
        <span>کمتر، اما بهتر.</span>

        <NuxtLink to="/products" class="bottom-link">
          کشف مجموعه کامل
          <span aria-hidden="true">←</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const products = [
  {
    id: 1,
    number: '01',
    name: ' کتانی  ',
    category: 'OUTERWEAR',
    price: '۲,۸۵۰,۰۰۰',
    image: '/images/p2.jpg',
    badge: 'پیشنهاد ویژه',
    color: '#9B8067',
    colorName: 'قهوه‌ای روشن'
  },
  {
    id: 2,
    number: '02',
    name: 'استایل روزمره',
    category: 'DAILY ESSENTIALS',
    price: '۱,۴۹۰,۰۰۰',
    image: '/images/p3.jpg',
    badge: '',
    color: '#D8C8B5',
    colorName: 'کرم'
  },
  {
    id: 3,
    number: '03',
    name: 'کیف شهری',
    category: 'ACCESSORIES',
    price: '۱,۹۵۰,۰۰۰',
    image: '/images/p4.jpg',
    badge: 'جدید',
    color: '#6D5141',
    colorName: 'قهوه‌ای'
  },
  {
    id: 4,
    number: '04',
    name: 'کتانی ساده',
    category: 'FOOTWEAR',
    price: '۲,۱۰۰,۰۰۰',
    image: '/images/p5.jpg',
    badge: '',
    color: '#E8E1D6',
    colorName: 'شیری'
  }
]
</script>

<style scoped>
.featured-section {
  padding: 92px 0 72px;
  background: var(--nova-surface);
  border-top: 1px solid var(--nova-border);
}

/* عنوان بخش */
.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 38px;
}

.section-title-group {
  min-width: 0;
}

.section-eyebrow {
  display: block;
  margin-bottom: 14px;
  color: var(--nova-accent);
  font-family: Arial, sans-serif;
  font-size: 10px;
  letter-spacing: 2px;
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(30px, 4vw, 46px);
  line-height: 1.6;
  font-weight: 800;
  letter-spacing: -1px;
}

.section-heading h2 span {
  color: var(--nova-accent);
}

.section-description {
  margin: 8px 0 0;
  color: var(--nova-muted);
  font-size: 13px;
  line-height: 2;
}

.view-all,
.bottom-link {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 9px;
  border-bottom: 1px solid var(--nova-border);
  font-size: 12px;
  white-space: nowrap;
  transition: border-color 200ms ease, color 200ms ease;
}

.view-all:hover,
.bottom-link:hover {
  color: var(--nova-accent);
  border-color: var(--nova-accent);
}

/* چیدمان محصولات با Flexbox */
.products-list {
  display: flex;
  flex-wrap: wrap;
  gap: 28px 20px;
}

.product-card {
  flex: 1 1 calc(25% - 20px);
  min-width: 0;
  max-width: calc(25% - 15px);
}

/* تصویر محصول */
.product-image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #eee9e1;
}

.product-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 500ms ease;
}

.product-card:hover .product-image {
  transform: scale(1.045);
}

.product-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 7px 10px;
  background: var(--nova-surface);
  color: var(--nova-ink);
  font-size: 10px;
}

.product-number {
  position: absolute;
  left: 13px;
  bottom: 12px;
  direction: ltr;
  color: white;
  font-family: Arial, sans-serif;
  font-size: 11px;
  text-shadow: 0 1px 5px #0008;
}

/* نام و قیمت */
.product-info {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding-top: 17px;
}

.product-details {
  min-width: 0;
}

.product-details h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.9;
}

.product-details p {
  margin: 5px 0 0;
  color: var(--nova-muted);
  font-family: Arial, sans-serif;
  font-size: 9px;
  letter-spacing: 1px;
}

.product-price {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  padding-top: 2px;
  white-space: nowrap;
  font-size: 11px;
  font-weight: 700;
}

.price-currency {
  color: var(--nova-muted);
  font-size: 9px;
  font-weight: 400;
}

/* رنگ و جزئیات پایین کارت */
.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 17px;
  padding-bottom: 13px;
  border-bottom: 1px solid var(--nova-border);
}

.product-color {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--nova-muted);
  font-size: 10px;
}

.color-dot {
  width: 10px;
  height: 10px;
  border: 1px solid #00000015;
  border-radius: 50%;
}

.product-arrow {
  color: var(--nova-muted);
  font-size: 16px;
  transition: color 200ms ease, transform 200ms ease;
}

.product-card:hover .product-arrow {
  color: var(--nova-accent);
  transform: translate(-2px, -2px);
}

/* انتهای بخش */
.featured-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 42px;
  padding-top: 22px;
  border-top: 1px solid var(--nova-border);
}

.featured-bottom > span {
  color: var(--nova-muted);
  font-size: 12px;
}

/* تبلت */
@media (max-width: 900px) {
  .featured-section {
    padding-top: 70px;
  }

  .products-list {
    gap: 28px 16px;
  }

  .product-card {
    flex-basis: calc(50% - 8px);
    max-width: calc(50% - 8px);
  }

  .section-heading h2 {
    font-size: 34px;
  }
}

/* موبایل */
@media (max-width: 560px) {
  .featured-section {
    padding: 54px 0 45px;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 26px;
  }

  .section-heading h2 {
    font-size: 31px;
  }

  .section-description {
    font-size: 12px;
  }

  .view-all {
    font-size: 11px;
  }

  .products-list {
    gap: 26px 12px;
  }

  .product-card {
    flex-basis: calc(50% - 6px);
    max-width: calc(50% - 6px);
  }

  .product-info {
    flex-direction: column;
    gap: 9px;
    padding-top: 12px;
  }

  .product-details h3 {
    font-size: 12px;
  }

  .product-price {
    flex-direction: row;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 5px;
    font-size: 11px;
  }

  .product-footer {
    margin-top: 12px;
  }

  .featured-bottom {
    margin-top: 30px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .product-image,
  .product-arrow,
  .view-all,
  .bottom-link {
    transition: none;
  }
}
</style>
```