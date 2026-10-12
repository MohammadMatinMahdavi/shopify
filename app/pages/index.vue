
<script setup>
import SiteHeader from '~/components/layout/SiteHeader.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import HomeHero from '~/components/home/HomeHero.vue'
import HomeCategories from '~/components/home/HomeCategories.vue'
import HomeFeatured from '~/components/home/HomeFeatured.vue'
</script>

<template>
  <div dir="rtl">
    <SiteHeader />

    <main>
      <HomeHero />
      <HomeCategories />
      <HomeFeatured />
    </main>

    <SiteFooter />
  </div>
</template>
