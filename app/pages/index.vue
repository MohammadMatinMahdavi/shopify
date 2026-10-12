
<script setup>
import SiteHeader from '~/components/layout/SiteHeader.vue'
import HomeHero from '~/components/home/HomeHero.vue'
import HomeFeatured from '~/components/home/HomeFeatured.vue'
</script>

<template>
  <div dir="rtl">
    <SiteHeader />

    <main>
      <HomeHero />
      <HomeFeatured />
    </main>
  </div>
</template>
