"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Central GSAP controller.
 * - Scroll-reveal for any element with .reveal (respects data-delay / data-anim)
 * - Animated stat counters ([data-count])
 * - Infinite marquee (.marquee-track)
 * - Header scroll state + back-to-top button
 */
export default function Animations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let marqueeCleanup = null;

    const ctx = gsap.context(() => {
      // ---- Scroll reveals ----
      gsap.utils.toArray(".reveal").forEach((el) => {
        if (reduceMotion) {
          gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
          return;
        }
        const delay = parseFloat(el.dataset.delay || "0");
        const anim = el.dataset.anim || "up";
        const from = { opacity: 0, duration: 0.9, delay, ease: "power3.out" };
        if (anim === "up") from.y = 55;
        if (anim === "down") from.y = -55;
        if (anim === "left") from.x = -60;
        if (anim === "right") from.x = 60;
        if (anim === "scale") from.scale = 0.85;

        gsap.from(el, {
          ...from,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      // ---- Stagger groups ----
      gsap.utils.toArray("[data-stagger]").forEach((group) => {
        const items = group.children;
        if (reduceMotion) {
          gsap.set(items, { opacity: 1, y: 0 });
          return;
        }
        gsap.from(items, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: group, start: "top 85%" },
        });
      });

      // ---- Counters ----
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const end = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        if (reduceMotion) {
          el.textContent = end.toLocaleString() + suffix;
          return;
        }
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: 2,
          ease: "power1.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toLocaleString() + suffix;
          },
        });
      });

      // ---- Marquee ----
      // Seamless infinite scroll: translate each track by the true distance
      // between two corresponding duplicated .marquee-item children (not
      // scrollWidth/2, which is thrown off by flex `gap` only applying
      // *between* items), and rebuild the measurement once webfonts have
      // swapped in and on resize, since the marquee text is viewport-width
      // relative (clamp()) and would otherwise drift out of sync with a
      // distance baked in at first paint.
      if (!reduceMotion) {
        const marqueeTweens = new Map();
        const tracks = gsap.utils.toArray(".marquee-track");

        function measurePeriod(track) {
          const items = track.querySelectorAll(":scope > .marquee-item");
          if (items.length < 2) return track.scrollWidth / 2;
          const mid = Math.floor(items.length / 2);
          return (
            items[mid].getBoundingClientRect().left -
            items[0].getBoundingClientRect().left
          );
        }

        function buildMarquee(track) {
          const existing = marqueeTweens.get(track);
          if (existing) existing.kill();

          const dir = track.dataset.dir === "right" ? 1 : -1;
          const half = measurePeriod(track);
          if (!half) return;

          const tween = gsap.to(track, {
            x: dir * half,
            duration: 24,
            ease: "none",
            repeat: -1,
            modifiers: {
              x: gsap.utils.unitize((x) => parseFloat(x) % half),
            },
          });
          marqueeTweens.set(track, tween);
        }

        const buildAll = () => tracks.forEach(buildMarquee);

        if (document.fonts && document.fonts.ready) {
          let built = false;
          const runOnce = () => {
            if (built) return;
            built = true;
            buildAll();
          };
          document.fonts.ready.then(runOnce);
          setTimeout(runOnce, 300);
        } else {
          buildAll();
        }

        let marqueeResizeTimer;
        const onMarqueeResize = () => {
          clearTimeout(marqueeResizeTimer);
          marqueeResizeTimer = setTimeout(buildAll, 150);
        };
        window.addEventListener("resize", onMarqueeResize);

        marqueeCleanup = () => {
          clearTimeout(marqueeResizeTimer);
          window.removeEventListener("resize", onMarqueeResize);
          marqueeTweens.forEach((tween) => tween.kill());
        };
      }
    });

    // ---- Header + back-to-top (plain listeners) ----
    const header = document.querySelector(".site-header");
    const toTop = document.querySelector(".to-top");
    const onScroll = () => {
      const y = window.scrollY;
      if (header) header.classList.toggle("scrolled", y > 60);
      if (toTop) toTop.classList.toggle("show", y > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Refresh once images/fonts settle
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 600);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(refresh);
      if (marqueeCleanup) marqueeCleanup();
      ctx.revert();
    };
  }, []);

  return null;
}
