<template>
  <section class="relative isolate overflow-hidden bg-[#f0e3df]">
    <div class="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#b8a4c8]/[0.18] blur-3xl"></div>
    <div class="pointer-events-none absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-[#8eaaa0]/[0.14] blur-3xl"></div>

    <div class="mx-auto grid w-[min(1440px,100%)] grid-cols-1 items-center gap-8 px-5 py-7 sm:px-8 lg:grid-cols-[minmax(0,1fr)_700px] lg:gap-10 lg:px-10 lg:py-9 xl:px-16">
      <div class="relative z-10 order-2 px-1 sm:px-2 lg:order-1 lg:py-2 lg:pl-5 xl:pl-10">
        <div class="flex items-center gap-3 text-[11px] font-medium text-[#77756f]"><span class="h-px w-9 bg-[#d95d43]"></span>مجموعه پاییز / زمستان ۱۴۰۵</div>
        <p class="mt-5 text-[10px] font-semibold tracking-[0.25em] text-[#d95d43]" dir="ltr">A MORE PERSONAL KIND OF STYLE</p>
        <h1 class="mt-3 max-w-[560px] text-[clamp(2.6rem,4.4vw,4.7rem)] font-black leading-[1.35] tracking-[-0.045em] text-[#20201e]">استایل تو،<span class="block text-[#d95d43]">قانون توست.</span></h1>
        <p class="mt-4 max-w-md text-sm leading-8 text-[#77756f] sm:text-[15px]">برای روزهایی که قرار نیست شبیه همه باشی. انتخاب‌هایی با طراحی ماندگار، فرم‌های دقیق و جزئیاتی که به چشم می‌آیند.</p>
        <div class="mt-6 flex flex-wrap items-center gap-5">
          <NuxtLink to="/products" class="group inline-flex min-h-12 items-center gap-8 rounded-full bg-[#20201e] px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgb(32_32_30_/_16%)] transition duration-300 hover:-translate-y-1 hover:bg-[#d95d43]">کشف مجموعه <span class="text-xl transition-transform group-hover:-translate-x-1" aria-hidden="true">←</span></NuxtLink>
          <a href="#categories" class="inline-flex items-center gap-2 text-xs text-[#77756f] transition-colors hover:text-[#d95d43]"><span class="grid h-9 w-9 place-items-center rounded-full border border-[#d8d1c7] text-base">↓</span>دسته‌بندی‌ها</a>
        </div>
        <div class="mt-7 grid max-w-md grid-cols-3 border-t border-[#dcd5ca] pt-4">
          <div class="flex flex-col gap-1"><strong class="text-base font-black text-[#20201e]" dir="ltr">01</strong><span class="text-[10px] text-[#77756f]">طراحی ماندگار</span></div>
          <div class="flex flex-col gap-1 border-r border-[#dcd5ca] pr-4"><strong class="text-base font-black text-[#20201e]" dir="ltr">02</strong><span class="text-[10px] text-[#77756f]">انتخاب هوشمند</span></div>
          <div class="flex flex-col gap-1 border-r border-[#dcd5ca] pr-4"><strong class="text-base font-black text-[#20201e]" dir="ltr">03</strong><span class="text-[10px] text-[#77756f]">امضای شخصی</span></div>
        </div>
      </div>

      <div class="group relative order-1 mx-auto h-[300px] w-full max-w-[700px] overflow-hidden rounded-[24px] bg-[#eee9e1] sm:h-[360px] lg:order-2 lg:h-[400px] lg:w-[700px]">
        <img
          src="/images/p1.jpg"
          alt="استایل مدرن با پوشش مینیمال"
          fetchpriority="high"
          class="h-full w-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
        <div class="pointer-events-none absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 text-[9px] tracking-[0.16em] text-white [text-shadow:0_1px_8px_#0008]" dir="ltr">
          <span>THE NEW EDIT</span>
          <span>COLLECTION Nº 01</span>
        </div>
      </div>
    </div>
  </section>
</template>
