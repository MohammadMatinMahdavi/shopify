import { onMounted, onBeforeUnmount, unref } from 'vue'

/**
 * Reveals marked children as they enter the viewport.
 * GSAP is loaded only in the browser to keep Nuxt SSR safe.
 */
export function useScrollReveal(target, selector = '[data-gsap-reveal]') {
  let context
  let isMounted = true

  onMounted(async () => {
    const element = unref(target)

    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ])

    if (!isMounted) return

    gsap.registerPlugin(ScrollTrigger)

    context = gsap.context(() => {
      const items = gsap.utils.toArray(selector, element)

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 42 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.82,
            delay: index * 0.075,
            ease: 'power3.out',
            clearProps: 'transform,opacity,visibility',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              once: true,
            },
          },
        )
      })
    }, element)
  })

  onBeforeUnmount(() => {
    isMounted = false
    context?.revert()
  })
}
