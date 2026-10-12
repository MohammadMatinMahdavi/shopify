```vue
<template>
  <section class="nova-container hero">
    <!-- بخش متن -->
    <div class="hero-copy nova-reveal">
      <div class="eyebrow">
        <span class="eyebrow-line"></span>
        مجموعه پاییز / زمستان
      </div>

      <h1>
        استایل تو،
        <span>قانون توست.</span>
      </h1>

      <p class="hero-description">
        انتخاب‌هایی برای روزهایی که می‌خواهی متفاوت باشی.
        ساده، ماندگار و دقیقاً شبیه خودت.
      </p>

      <div class="hero-actions">
        <NuxtLink to="/products" class="primary-button">
          کشف مجموعه
          <span aria-hidden="true">←</span>
        </NuxtLink>

        <a href="#featured" class="text-link">
          دیدن محصولات
        </a>
      </div>

      <div class="hero-meta">
        <div>
          <strong>01</strong>
          <span>طراحی ماندگار</span>
        </div>

        <div>
          <strong>02</strong>
          <span>انتخاب هوشمندانه</span>
        </div>
      </div>
    </div>

    <!-- بخش تصویر -->
    <div class="hero-visual">
      <div class="hero-image-wrap">
        <img
          class="hero-image"
          src="/images/p1.jpg"
          alt="استایل مدرن با پوشش مینیمال"
          fetchpriority="high"
        />

        <div class="image-label">
          <span>THE NEW EDIT</span>
          <span>COLLECTION Nº 01</span>
        </div>
      </div>

      <div class="floating-note">
        <span class="note-dot"></span>

        <div>
          <strong>Less, but better.</strong>
          <span>کمتر، اما بهتر.</span>
        </div>
      </div>

      <span class="hero-index">Nº 001 — NOVA STUDIO</span>
    </div>
  </section>
</template>

<style scoped>
/* چیدمان اصلی */
.hero {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: clamp(28px, 5vw, 72px);

  min-height: 680px;
  padding-top: 48px;
  padding-bottom: 72px;
}

/* بخش متن */
.hero-copy {
  flex: 0 1 44%;
  min-width: 0;
  padding-block: 24px;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;

  color: var(--nova-muted);
  font-size: 12px;
}

.eyebrow-line {
  width: 26px;
  height: 1px;
  background: var(--nova-accent);
}

h1 {
  margin: 30px 0 20px;

  font-size: clamp(42px, 5.3vw, 76px);
  line-height: 1.45;
  font-weight: 800;
  letter-spacing: -2px;
}

h1 span {
  display: block;
  color: var(--nova-accent);
}

.hero-description {
  max-width: 370px;
  margin: 0;

  color: var(--nova-muted);
  font-size: 15px;
  line-height: 2.2;
}

.hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 32px;
}

.primary-button {
  min-height: 54px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 0 23px;

  background: var(--nova-ink);
  color: white;
  font-size: 13px;

  transition:
    background 200ms ease,
    transform 200ms ease;
}

.primary-button:hover {
  background: var(--nova-accent);
  transform: translateY(-2px);
}

.primary-button span {
  font-size: 20px;
}

.text-link {
  padding-block: 8px;
  border-bottom: 1px solid var(--nova-border);
  font-size: 13px;
  transition: border-color 200ms ease;
}

.text-link:hover {
  border-color: var(--nova-accent);
}

/* اطلاعات تکمیلی */
.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-top: 62px;
}

.hero-meta div {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hero-meta strong {
  font-family: Arial, sans-serif;
  font-size: 12px;
  color: var(--nova-accent);
}

.hero-meta span {
  color: var(--nova-muted);
  font-size: 11px;
}

/* بخش تصویر */
.hero-visual {
  position: relative;
  flex: 1 1 56%;
  min-width: 0;
  padding: 0 0 24px 18px;
}

.hero-image-wrap {
  position: relative;
  width: 100%;
  height: clamp(420px, 43vw, 590px);
  overflow: hidden;

}

.hero-image {
  display: block;
  width: 100%;
  height: 100%;

  object-fit: contain;
  object-position: center;

  transition: transform 700ms ease;
}

.hero-image-wrap:hover .hero-image {
  transform: scale(1.025);
}

/* نوشته روی تصویر */
.image-label {
  position: absolute;
  inset-inline: 18px;
  bottom: 18px;

  display: flex;
  justify-content: space-between;
  gap: 12px;

  color: white;
  font-family: Arial, sans-serif;
  font-size: 9px;
  letter-spacing: 1px;
  text-shadow: 0 1px 8px #0008;
  pointer-events: none;
}

/* کارت شناور */
.floating-note {
  position: absolute;
  right: -8px;
  bottom: 65px;

  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;

  background: var(--nova-surface);
  box-shadow: 0 12px 40px #20201e12;
}

.note-dot {
  width: 9px;
  height: 9px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: var(--nova-accent);
}

.floating-note div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.floating-note strong {
  direction: ltr;
  text-align: right;
  font-family: Arial, sans-serif;
  font-size: 12px;
}

.floating-note span:last-child {
  color: var(--nova-muted);
  font-size: 10px;
}

/* شناسه تصویر */
.hero-index {
  position: absolute;
  left: 0;
  bottom: 0;

  direction: ltr;
  font-family: Arial, sans-serif;
  font-size: 9px;
  letter-spacing: 1px;
  color: var(--nova-muted);
}

/* تبلت و لپ‌تاپ‌های کوچک */
@media (max-width: 900px) {
  .hero {
    gap: 28px;
    min-height: auto;
    padding-top: 30px;
    padding-bottom: 55px;
  }

  .hero-copy {
    flex-basis: 46%;
  }

  .hero-visual {
    flex-basis: 54%;
  }

  .hero-image-wrap {
    height: 430px;
  }

  h1 {
    font-size: clamp(36px, 5vw, 54px);
    letter-spacing: -1px;
  }

  .hero-meta {
    margin-top: 38px;
    gap: 20px;
  }

  .floating-note {
    right: -6px;
  }
}

/* موبایل */
@media (max-width: 640px) {
  .hero {
    flex-direction: column;
    align-items: stretch;
    gap: 28px;

    min-height: auto;
    padding-top: 30px;
    padding-bottom: 45px;
  }

  .hero-copy,
  .hero-visual {
    flex: 0 1 auto;
    width: 100%;
    min-width: 0;
  }

  .hero-copy {
    padding-top: 10px;
    padding-bottom: 0;
  }

  h1 {
    margin-top: 22px;
    margin-bottom: 14px;

    font-size: clamp(43px, 11vw, 62px);
    line-height: 1.35;
    letter-spacing: -1.5px;
  }

  .hero-description {
    font-size: 14px;
  }

  .hero-meta {
    margin-top: 32px;
  }

  .hero-visual {
    padding: 0 0 24px 10px;
  }

  .hero-image-wrap {
    height: auto;
    aspect-ratio: 4 / 5;
  }

  .hero-image {
    object-fit: contain;
  }

  .floating-note {
    right: -2px;
    bottom: 58px;
    padding: 12px 14px;
  }

  .hero-index {
    font-size: 8px;
  }
}

/* کاهش انیمیشن برای کاربرانی که این گزینه را فعال کرده‌اند */
@media (prefers-reduced-motion: reduce) {
  .hero-image,
  .primary-button {
    transition: none;
  }
}
</style>
```