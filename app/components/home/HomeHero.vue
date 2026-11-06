<template>
  <section class="relative isolate overflow-hidden bg-[#f0e3df]">
    <div class="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#b8a4c8]/[0.22] blur-3xl"></div>
    <div class="pointer-events-none absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-[#8eaaa0]/[0.16] blur-3xl"></div>
    <div class="mx-auto grid min-h-[650px] w-[min(1440px,100%)] grid-cols-1 items-center gap-0 lg:min-h-[760px] lg:grid-cols-[0.72fr_1.28fr]">
      <div class="relative z-10 order-2 px-6 pb-14 pt-9 sm:px-10 lg:order-1 lg:px-16 lg:py-20 xl:px-24">
        <div class="flex items-center gap-3 text-[11px] font-medium text-[#77756f]"><span class="h-px w-9 bg-[#d95d43]"></span>مجموعه پاییز / زمستان ۱۴۰۵</div>
        <p class="mt-8 text-[10px] font-semibold tracking-[0.28em] text-[#d95d43]" dir="ltr">A MORE PERSONAL KIND OF STYLE</p>
        <h1 class="mt-4 max-w-[650px] text-[clamp(3.2rem,7vw,7.2rem)] font-black leading-[1.28] tracking-[-0.055em] text-[#20201e]">استایل تو،<span class="block text-[#d95d43]">قانون توست.</span></h1>
        <p class="mt-6 max-w-md text-sm leading-8 text-[#77756f] sm:text-base">برای روزهایی که قرار نیست شبیه همه باشی. انتخاب‌هایی با طراحی ماندگار، فرم‌های دقیق و جزئیاتی که به چشم می‌آیند.</p>
        <div class="mt-9 flex flex-wrap items-center gap-5">
          <NuxtLink to="/products" class="group inline-flex min-h-14 items-center gap-10 rounded-full bg-[#20201e] px-7 text-sm font-semibold text-white shadow-[0_12px_30px_rgb(32_32_30_/_16%)] transition duration-300 hover:-translate-y-1 hover:bg-[#d95d43]">کشف مجموعه <span class="text-xl transition-transform group-hover:-translate-x-1" aria-hidden="true">←</span></NuxtLink>
          <a href="#categories" class="inline-flex items-center gap-2 text-xs text-[#77756f] transition-colors hover:text-[#d95d43]"><span class="grid h-9 w-9 place-items-center rounded-full border border-[#d8d1c7] text-base">↓</span>دسته‌بندی‌ها</a>
        </div>
        <div class="mt-12 grid max-w-md grid-cols-3 border-t border-[#dcd5ca] pt-5">
          <div class="flex flex-col gap-1"><strong class="text-lg font-black text-[#20201e]" dir="ltr">01</strong><span class="text-[10px] text-[#77756f]">طراحی ماندگار</span></div>
          <div class="flex flex-col gap-1 border-r border-[#dcd5ca] pr-4"><strong class="text-lg font-black text-[#20201e]" dir="ltr">02</strong><span class="text-[10px] text-[#77756f]">انتخاب هوشمند</span></div>
          <div class="flex flex-col gap-1 border-r border-[#dcd5ca] pr-4"><strong class="text-lg font-black text-[#20201e]" dir="ltr">03</strong><span class="text-[10px] text-[#77756f]">امضای شخصی</span></div>
        </div>
      </div>
      <div class="group relative order-1 min-h-[390px] overflow-hidden bg-[#c8b9a8] sm:min-h-[520px] lg:order-2 lg:h-full lg:min-h-[760px]">
        <img class="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]" src="/images/p1.jpg" alt="استایل مدرن مجموعه NOVA" fetchpriority="high" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#171614]/55 via-transparent to-[#171614]/10"></div>
        <div class="absolute right-6 top-6 flex items-center gap-3 text-[9px] tracking-[0.2em] text-white/90 sm:right-10 sm:top-10" dir="ltr"><span class="h-px w-8 bg-white/70"></span>THE NEW EDIT / 2026</div>
        <div class="absolute bottom-8 right-6 left-6 flex items-end justify-between gap-4 text-white sm:bottom-12 sm:right-10 sm:left-10">
          <div><span class="mb-2 block text-[9px] tracking-[0.24em] text-white/70" dir="ltr">NOVA STUDIO PRESENTS</span><p class="text-2xl font-bold sm:text-4xl">فراتر از یک انتخاب.</p></div>
          <span class="hidden text-[9px] tracking-[0.2em] text-white/70 sm:block" dir="ltr">COLLECTION Nº 01</span>
        </div>
        <div class="absolute bottom-1/2 left-5 hidden -translate-y-1/2 rounded-full border border-white/50 bg-white/10 px-5 py-3 text-[9px] tracking-[0.18em] text-white backdrop-blur-md xl:block" dir="ltr">OBJECTS OF STYLE</div>
      </div>
    </div>
  </section>
</template>