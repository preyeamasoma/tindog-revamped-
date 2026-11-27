/* ==========================================================================
   TinDog — interactions
   ========================================================================== */

(function () {
  "use strict";

  document.body.classList.add("js-ready");

  /* ---------- Sticky navbar state ---------- */
  const nav = document.getElementById("siteNav");

  if (nav) {
    const setNavState = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    setNavState();
    window.addEventListener("scroll", setNavState, { passive: true });
  }

  /* ---------- Reveal on scroll (with stagger) ---------- */
  document.querySelectorAll("[data-delay]").forEach((el) => {
    el.style.setProperty("--delay", `${el.dataset.delay}ms`);
  });

  const revealItems = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || prefersReducedMotion) {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealItems.forEach((el) => observer.observe(el));
  }

  /* ---------- Close the mobile menu after tapping a link ---------- */
  const menu = document.getElementById("navMenu");

  if (menu && window.bootstrap) {
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (!menu.classList.contains("show")) return;
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
      });
    });
  }

  /* ---------- Subtle 3D tilt on the phone ---------- */
  const stage = document.querySelector(".phone-stage");
  const tilt = document.getElementById("phoneTilt");
  const canTilt = window.matchMedia("(hover: hover) and (min-width: 992px)").matches;

  if (stage && tilt && canTilt && !prefersReducedMotion) {
    stage.addEventListener("pointermove", (event) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      tilt.style.transform = `rotateY(${x * 9}deg) rotateX(${y * -9}deg)`;
    });

    stage.addEventListener("pointerleave", () => {
      tilt.style.transform = "";
    });
  }
})();
