/* Swirlberry — About Us. Independent page JavaScript. */

(() => {
  "use strict";

  function initializePage() {
    const root = document.documentElement;

    const themeButton = document.getElementById("themeToggle");
    const directionButton = document.getElementById("directionToggle");
    const menuButton = document.getElementById("mobileToggle");

    const navigation = document.getElementById("navigation");
    const dropdown = document.getElementById("homeDropdown");
    const header = document.querySelector(".site-header");

    const desktop = window.matchMedia("(min-width: 1251px)");
    const darkPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const storageKeys = {
      theme: "swirlberry-theme",
      direction: "swirlberry-direction"
    };

    /* OPTIONAL BROWSER STORAGE */

    function readPreference(key) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    }

    function savePreference(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {
        // Controls still work when storage is unavailable.
      }
    }

    function watchMedia(media, callback) {
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", callback);
      } else if (typeof media.addListener === "function") {
        media.addListener(callback);
      }
    }

    /* LIGHT / DARK MODE */

    const moonIcon = `
      <path d="M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z"/>
    `;

    const sunIcon = `
      <circle cx="12" cy="12" r="4"/>
      <path
        d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"
      />
    `;

    let chosenTheme = readPreference(storageKeys.theme);

    function applyTheme(theme) {
      const isDark = theme === "dark";

      root.dataset.theme = isDark ? "dark" : "light";

      if (!themeButton) return;

      const label = `Switch to ${isDark ? "light" : "dark"} mode`;

      themeButton.setAttribute("aria-label", label);
      themeButton.title = label;

      const icon = themeButton.querySelector("svg");

      if (icon) {
        icon.innerHTML = isDark ? sunIcon : moonIcon;
      }
    }

    const initialTheme =
      chosenTheme === "dark" || chosenTheme === "light"
        ? chosenTheme
        : darkPreference.matches
          ? "dark"
          : "light";

    applyTheme(initialTheme);

    themeButton?.addEventListener("click", () => {
      chosenTheme =
        root.dataset.theme === "dark" ? "light" : "dark";

      applyTheme(chosenTheme);
      savePreference(storageKeys.theme, chosenTheme);
    });

    watchMedia(darkPreference, (event) => {
      const hasExplicitPreference =
        chosenTheme === "light" || chosenTheme === "dark";

      if (!hasExplicitPreference) {
        applyTheme(event.matches ? "dark" : "light");
      }
    });

    /* RTL / LTR */

    function applyDirection(direction) {
      root.dir = direction === "rtl" ? "rtl" : "ltr";

      if (!directionButton) return;

      const label =
        root.dir === "rtl"
          ? "Switch to left-to-right layout"
          : "Switch to right-to-left layout";

      directionButton.setAttribute("aria-label", label);
      directionButton.title = label;
    }

    applyDirection(readPreference(storageKeys.direction));

    directionButton?.addEventListener("click", () => {
      const nextDirection =
        root.dir === "rtl" ? "ltr" : "rtl";

      applyDirection(nextDirection);
      savePreference(storageKeys.direction, nextDirection);
    });

    /* ENABLE JAVASCRIPT CONTROLS */

    [themeButton, directionButton, menuButton].forEach((button) => {
      if (button) button.hidden = false;
    });

    document.body.classList.add("enhanced");

    /* HEADER HEIGHT */

    let lastHeaderHeight = 0;
    let measureFrame = 0;

    function measureHeader() {
      if (!header) return;

      const menuIsOpen =
        navigation?.classList.contains("is-open");

      if (!desktop.matches && menuIsOpen) return;

      const height = Math.ceil(
        header.getBoundingClientRect().height
      );

      if (height > 0 && height !== lastHeaderHeight) {
        lastHeaderHeight = height;

        root.style.setProperty(
          "--header-height",
          `${height}px`
        );
      }
    }

    function scheduleHeaderMeasurement() {
      if (measureFrame) return;

      measureFrame = requestAnimationFrame(() => {
        measureFrame = 0;
        measureHeader();
      });
    }

    /* MOBILE NAVIGATION */

    function setMenu(open, restoreFocus = false) {
      if (!navigation || !menuButton) return;

      navigation.classList.toggle("is-open", open);

      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
      );

      if (!open) {
        if (dropdown) dropdown.open = false;
        scheduleHeaderMeasurement();
      }

      if (restoreFocus) menuButton.focus();
    }

    menuButton?.addEventListener("click", () => {
      const isOpen =
        menuButton.getAttribute("aria-expanded") === "true";

      setMenu(!isOpen);
    });

    watchMedia(desktop, () => {
      setMenu(false);
      scheduleHeaderMeasurement();
    });

    navigation?.addEventListener("click", (event) => {
      const link = event.target.closest("a");

      if (!link) return;

      const wasMobileOpen =
        !desktop.matches &&
        menuButton?.getAttribute("aria-expanded") === "true";

      setMenu(false);

      // Restore focus only for a same-page navigation destination.
      if (wasMobileOpen && link.getAttribute("href")?.startsWith("#")) {
        menuButton.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (dropdown && !dropdown.contains(event.target)) {
        dropdown.open = false;
      }

      if (
        !desktop.matches &&
        header &&
        !header.contains(event.target)
      ) {
        setMenu(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;

      if (dropdown?.open) {
        dropdown.open = false;
        dropdown.querySelector("summary")?.focus();
        return;
      }

      if (
        menuButton?.getAttribute("aria-expanded") === "true"
      ) {
        setMenu(false, true);
      }
    });

    /* DESKTOP HOME DROPDOWN */

    dropdown?.addEventListener("pointerenter", (event) => {
      if (desktop.matches && event.pointerType === "mouse") {
        dropdown.open = true;
      }
    });

    dropdown?.addEventListener("pointerleave", (event) => {
      const focusIsInside = dropdown.contains(
        document.activeElement
      );

      if (
        desktop.matches &&
        event.pointerType === "mouse" &&
        !focusIsInside
      ) {
        dropdown.open = false;
      }
    });

    dropdown?.addEventListener("focusout", (event) => {
      if (!dropdown.contains(event.relatedTarget)) {
        dropdown.open = false;
      }
    });

    measureHeader();

    if (header && "ResizeObserver" in window) {
      const headerObserver = new ResizeObserver(
        scheduleHeaderMeasurement
      );

      headerObserver.observe(header);
    } else {
      window.addEventListener(
        "resize",
        scheduleHeaderMeasurement,
        { passive: true }
      );
    }

    window.addEventListener(
      "load",
      scheduleHeaderMeasurement,
      { once: true }
    );

    /* IMAGE FALLBACKS */

    const dessertIllustration = `
      <svg xmlns="http://www.w3.org/2000/svg"
        width="900" height="1000" viewBox="0 0 900 1000">
        <rect width="900" height="1000" fill="#f8f6f5"/>
        <circle cx="450" cy="430" r="240" fill="#eee7ea"/>
        <g stroke="#087F83" stroke-width="12"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="m330 500 120 250 120-250Z"
            fill="#fff"/>
          <path
            d="M330 500c-100-90 40-110 110-240 0 110 210 150 130 240Z"
            fill="#D93675"/>
          <path d="m373 540 101 156m51-156-102 156"
            fill="none"/>
        </g>
        <text x="450" y="850" fill="#242226"
          text-anchor="middle" font-family="Arial,sans-serif"
          font-size="26">A little scoop. A lot of happy.</text>
      </svg>
    `;

    const logoIllustration = `
      <svg xmlns="http://www.w3.org/2000/svg"
        width="100" height="100" viewBox="0 0 100 100">
        <g stroke="#087F83" stroke-width="3"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="m31 54 19 39 19-39Z" fill="#fff"/>
          <path
            d="M31 54C13 38 39 34 48 9c0 22 40 29 21 45Z"
            fill="#D93675"/>
          <path d="m37 62 20 20m6-20L43 82" fill="none"/>
        </g>
      </svg>
    `;

    function svgDataUrl(markup) {
      return (
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(markup)
      );
    }

    const dessertFallback = svgDataUrl(dessertIllustration);
    const logoFallback = svgDataUrl(logoIllustration);

    document.querySelectorAll("img").forEach((image) => {
      function showFallback() {
        if (image.dataset.fallback === "true") return;

        image.dataset.fallback = "true";
        image.classList.add("image-failed");

        // Prevent a failed srcset from overriding the fallback.
        image.removeAttribute("srcset");
        image.removeAttribute("sizes");

        const isLogo = image.classList.contains("logo");
        const isDecorative = image.alt === "";

        if (!isLogo && !isDecorative) {
          image.alt =
            `${image.alt} — photograph unavailable; ` +
            "dessert illustration shown";
        }

        image.src = isLogo ? logoFallback : dessertFallback;
      }

      image.addEventListener("error", showFallback);

      if (image.complete && image.naturalWidth === 0) {
        showFallback();
      }
    });

    /* SCROLL REVEAL */

    let revealObserver;

    const revealElements = [
      ...document.querySelectorAll(".reveal")
    ];

    function revealAll() {
      revealObserver?.disconnect();

      revealElements.forEach((element) => {
        element.classList.remove("pending");
        element.classList.add("is-visible");
      });
    }

    if (
      "IntersectionObserver" in window &&
      !reducedMotion.matches
    ) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.remove("pending");
            entry.target.classList.add("is-visible");

            revealObserver.unobserve(entry.target);
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -20px 0px"
        }
      );

      revealElements.forEach((element) => {
        element.classList.add("pending");
        revealObserver.observe(element);
      });
    }

    // A keyboard user must never land inside an invisible card.
    document.addEventListener("focusin", (event) => {
      const element = event.target.closest(".reveal.pending");

      if (!element) return;

      element.classList.remove("pending");
      element.classList.add("is-visible");
      revealObserver?.unobserve(element);
    });

    watchMedia(reducedMotion, (event) => {
      if (event.matches) revealAll();
    });

    window.addEventListener("beforeprint", revealAll);

    /* FOOTER YEAR */

    const yearElement = document.getElementById("year");

    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializePage,
      { once: true }
    );
  } else {
    initializePage();
  }
})();