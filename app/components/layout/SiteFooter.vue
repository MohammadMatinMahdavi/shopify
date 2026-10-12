
<script setup>
const currentYear = new Date().getFullYear()

const shopLinks = [
  { label: 'همه محصولات', href: '/products' },
  { label: 'تازه‌رسیده‌ها', href: '/products?sort=newest' },
  { label: 'درباره ما', href: '/about' }
]

const helpLinks = [
  { label: 'راهنمای خرید', href: '/help' },
  { label: 'سؤالات متداول', href: '/faq' },
  { label: 'تماس با ما', href: '/contact' }
]
</script>

<template>
  <footer class="site-footer">
    <div class="footer-main nova-container">
      <div class="footer-brand-column">
        <NuxtLink to="/" class="footer-brand">
          NOVA<span>.</span>
        </NuxtLink>
        <span class="footer-brand-caption">OBJECTS OF STYLE</span>

        <p class="footer-description">
          انتخاب‌هایی بافکر، طراحی ماندگار و جزئیاتی که استایل تو را تعریف می‌کنند.
        </p>

        <div class="social-links">
          <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="اینستاگرام">IG</a>
          <a href="https://t.me/" target="_blank" rel="noreferrer" aria-label="تلگرام">TG</a>
          <a href="https://wa.me/" target="_blank" rel="noreferrer" aria-label="واتساپ">WA</a>
        </div>
      </div>

      <div class="footer-link-column">
        <h3>دسترسی سریع</h3>
        <NuxtLink v-for="link in shopLinks" :key="link.label" :to="link.href">
          {{ link.label }}
        </NuxtLink>
      </div>

      <div class="footer-link-column">
        <h3>راهنمای مشتریان</h3>
        <NuxtLink v-for="link in helpLinks" :key="link.label" :to="link.href">
          {{ link.label }}
        </NuxtLink>
      </div>

      <div class="footer-contact-column">
        <h3>در ارتباط باشیم</h3>
        <p>برای پرسش درباره محصولات یا پیگیری سفارش با ما در ارتباط باش.</p>
        <a class="contact-link" href="mailto:hello@nova.example">
          hello@nova.example <span>↗</span>
        </a>
        <span class="contact-note">شنبه تا پنج‌شنبه · ۹ تا ۱۸</span>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="nova-container footer-bottom-inner">
        <span>© {{ currentYear }} NOVA. تمام حقوق محفوظ است.</span>
        <span class="footer-made">ساخته‌شده با دقت، برای استایل تو.</span>
        <NuxtLink to="/">بازگشت به بالا ↑</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer { background: #20201e; color: #fffefa; }
.footer-main { display: flex; justify-content: space-between; gap: clamp(24px, 4vw, 64px); padding-top: 66px; padding-bottom: 58px; }
.footer-brand-column { flex: 1.3 1 0; min-width: 190px; }
.footer-brand { display: inline-block; direction: ltr; font: 900 35px/.9 Arial, sans-serif; letter-spacing: -2px; }
.footer-brand span { color: var(--nova-accent); }
.footer-brand-caption { display: block; margin-top: 9px; color: #a7a39b; font: 7px Arial, sans-serif; letter-spacing: 2px; }
.footer-description { max-width: 270px; margin: 22px 0; color: #b8b4ad; font-size: 11px; line-height: 2.2; }
.social-links { display: flex; gap: 8px; }
.social-links a { width: 35px; height: 35px; display: grid; place-items: center; border: 1px solid #ffffff26; color: #e6e1d8; font: 10px Arial, sans-serif; transition: background .2s ease, border-color .2s ease; }
.social-links a:hover { background: var(--nova-accent); border-color: var(--nova-accent); }
.footer-link-column, .footer-contact-column { flex: 1 1 0; min-width: 120px; display: flex; flex-direction: column; align-items: flex-start; gap: 14px; }
.footer-link-column h3, .footer-contact-column h3 { margin: 3px 0 10px; color: white; font-size: 12px; font-weight: 700; }
.footer-link-column a { color: #b8b4ad; font-size: 11px; transition: color .2s ease, transform .2s ease; }
.footer-link-column a:hover { color: #f2b19f; transform: translateX(-3px); }
.footer-contact-column p { max-width: 245px; margin: 0; color: #b8b4ad; font-size: 11px; line-height: 2.1; }
.contact-link { display: inline-flex; align-items: center; gap: 12px; margin-top: 5px; padding-bottom: 7px; border-bottom: 1px solid #ffffff40; direction: ltr; font: 12px Arial, sans-serif; }
.contact-link span { color: #f2b19f; }
.contact-note { color: #918d86; font-size: 10px; }
.footer-bottom { border-top: 1px solid #ffffff1c; }
.footer-bottom-inner { min-height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 18px; color: #a7a39b; font-size: 9px; }
.footer-bottom-inner a { color: #e6e1d8; transition: color .2s ease; white-space: nowrap; }
.footer-bottom-inner a:hover { color: #f2b19f; }
.footer-made { text-align: center; }
@media (max-width: 800px) {
  .footer-main { flex-wrap: wrap; gap: 38px 24px; padding-top: 50px; padding-bottom: 44px; }
  .footer-brand-column { flex-basis: calc(50% - 12px); }
  .footer-link-column, .footer-contact-column { flex-basis: calc(50% - 12px); }
}
@media (max-width: 480px) {
  .footer-main { gap: 32px 18px; }
  .footer-brand-column { flex-basis: 100%; }
  .footer-link-column, .footer-contact-column { flex-basis: calc(50% - 9px); }
  .footer-bottom-inner { flex-wrap: wrap; justify-content: space-between; padding-top: 16px; padding-bottom: 16px; }
  .footer-made { order: 3; flex-basis: 100%; text-align: right; }
}
</style>
