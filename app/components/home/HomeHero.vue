<template>
  <section class="mx-auto grid w-[min(1320px,calc(100%-32px))] grid-cols-1 items-center gap-8 pb-12 pt-8 sm:w-[min(1320px,calc(100%-48px))] sm:gap-10 sm:pb-16 sm:pt-12 lg:min-h-[680px] lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:py-16">
    <div class="nova-reveal order-2 min-w-0 py-2 lg:order-1 lg:py-8">
      <div class="flex items-center gap-3 text-xs text-[#77756f]"><span class="h-px w-7 bg-[#d95d43]"></span>مجموعه پاییز / زمستان</div>
      <p class="mt-7 text-[10px] font-semibold tracking-[0.24em] text-[#d95d43]" dir="ltr">A MORE PERSONAL KIND OF STYLE</p>
      <h1 class="mt-4 text-[clamp(2.8rem,6vw,5.6rem)] font-extrabold leading-[1.35] tracking-tight text-[#20201e]">استایل تو،<span class="block text-[#d95d43]">قانون توست.</span></h1>
      <p class="mt-5 max-w-md text-sm leading-8 text-[#77756f] sm:text-base">انتخاب‌هایی برای روزهایی که می‌خواهی متفاوت باشی. ساده، ماندگار و دقیقاً شبیه خودت.</p>
      <div class="mt-8 flex flex-wrap items-center gap-5">
        <NuxtLink to="/products" class="group inline-flex min-h-14 items-center gap-8 bg-[#20201e] px-6 text-sm text-white transition duration-300 hover:-translate-y-1 hover:bg-[#d95d43] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d95d43]">کشف مجموعه <span class="text-xl transition-transform group-hover:-translate-x-1" aria-hidden="true">←</span></NuxtLink>
        <a href="#featured" class="border-b border-[#e7e3db] pb-2 text-sm transition-colors hover:border-[#d95d43] hover:text-[#d95d43]">دیدن محصولات</a>
      </div>
      <div class="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-[#e7e3db] pt-6 sm:mt-14">
        <div class="flex flex-col gap-1.5"><strong class="font-sans text-xs text-[#d95d43]">01</strong><span class="text-xs text-[#77756f]">طراحی ماندگار</span></div>
        <div class="flex flex-col gap-1.5"><strong class="font-sans text-xs text-[#d95d43]">02</strong><span class="text-xs text-[#77756f]">انتخاب هوشمندانه</span></div>
      </div>
    </div>
    <div class="group relative order-1 min-w-0 pb-7 pl-2 lg:order-2 lg:pl-5">
      <div class="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] bg-[#e9e3d9] sm:aspect-[1.08/1] lg:aspect-[1.12/1]">
        <img class="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.035]" src="/images/p1.jpg" alt="استایل مدرن با پوشش مینیمال" fetchpriority="high" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5"></div>
        <div class="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 text-[9px] tracking-[0.18em] text-white sm:inset-x-7 sm:bottom-7" dir="ltr"><span>THE NEW EDIT</span><span>COLLECTION Nº 01</span></div>
      </div>
      <div class="absolute -bottom-1 left-0 flex items-center gap-2 text-[9px] tracking-[0.16em] text-[#77756f]" dir="ltr"><span class="h-1.5 w-1.5 rounded-full bg-[#d95d43]"></span>Nº 001 — NOVA STUDIO</div>
      <div class="absolute -right-1 bottom-16 hidden items-center gap-3 rounded-2xl border border-white/70 bg-[#fffefa]/95 px-5 py-4 shadow-[0_14px_38px_rgb(32_32_30_/_7%)] sm:flex"><span class="h-2.5 w-2.5 rounded-full bg-[#d95d43]"></span><span class="flex flex-col gap-1"><strong class="text-xs" dir="ltr">CURATED FOR YOU</strong><span class="text-[10px] text-[#77756f]">جزئیات، تفاوت را می‌سازند</span></span></div>
    </div>
  </section>
</template>