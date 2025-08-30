import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapEffects(deps?: unknown) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Micro-interactions for buttons
      const buttons = gsap.utils.toArray<HTMLElement>(".micro-bounce");
      const onDown = (el: HTMLElement) => gsap.to(el, { scale: 0.96, duration: 0.08, ease: "power1.out" });
      const onUp = (el: HTMLElement) => gsap.to(el, { scale: 1, duration: 0.18, ease: "back.out(2)" });
      buttons.forEach((btn) => {
        btn.addEventListener("pointerdown", () => onDown(btn));
        btn.addEventListener("pointerup", () => onUp(btn));
        btn.addEventListener("pointerleave", () => onUp(btn));
      });

      // Reveal on scroll (stagger children)
      gsap.utils.toArray<HTMLElement>(".reveal-on-scroll").forEach((container) => {
        const children = Array.from(container.children) as HTMLElement[];
        gsap.from(children, {
          opacity: 0,
          y: 16,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        });
      });

      // Parallax elements using data-parallax (0.1 - 0.6 typical)
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.2;
        gsap.to(el, {
          yPercent: -speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    // Refresh ScrollTrigger after layout
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [deps]);
}
