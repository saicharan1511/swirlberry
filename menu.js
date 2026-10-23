/* Swirlberry — standalone Menu page */

(() => {
  "use strict";

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

  /* STORAGE */

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
      // Controls still work when browser storage is unavailable.
    }
  }

  function listenToMedia(query, handler) {
    if (query.addEventListener) {
      query.addEventListener("change", handler);
    } else {
      query.addListener(handler);
    }
  }

  /* THEME */

  let chosenTheme = readPreference("swirlberry-theme");

  const moonIcon = `
    <path d="M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z"/>
  `;

  const sunIcon = `
    <circle cx="12" cy="12" r="4"/>
    <path
      d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"
    />
  `;

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

  applyTheme(
    chosenTheme === "dark" || chosenTheme === "light"
      ? chosenTheme
      : darkPreference.matches
        ? "dark"
        : "light"
  );

  themeButton?.addEventListener("click", () => {
    chosenTheme =
      root.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(chosenTheme);
    savePreference("swirlberry-theme", chosenTheme);
  });

  listenToMedia(darkPreference, (event) => {
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

  applyDirection(readPreference("swirlberry-direction"));

  directionButton?.addEventListener("click", () => {
    const nextDirection = root.dir === "rtl" ? "ltr" : "rtl";

    applyDirection(nextDirection);
    savePreference("swirlberry-direction", nextDirection);
  });

  [themeButton, directionButton, menuButton].forEach((button) => {
    if (button) button.hidden = false;
  });

  document.body.classList.add("enhanced");

  /* MOBILE MENU */

  function setMenu(open, restoreFocus = false) {
    if (!navigation || !menuButton) return;

    navigation.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation"
    );

    if (!open && dropdown) {
      dropdown.open = false;
    }

    if (restoreFocus) {
      menuButton.focus();
    }

    if (!open) {
      requestAnimationFrame(measureHeader);
    }
  }

  menuButton?.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    setMenu(!isOpen);
  });

  listenToMedia(desktop, () => {
    setMenu(false);
    measureHeader();
  });

  navigation?.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenu(false);
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

    if (menuButton?.getAttribute("aria-expanded") === "true") {
      setMenu(false, true);
    }
  });

  /* DESKTOP DROPDOWN */

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

  /* FULL-SCREEN HERO HEIGHT */

  function measureHeader() {
    if (!header) return;

    const mobileMenuIsOpen =
      navigation?.classList.contains("is-open");

    if (desktop.matches || !mobileMenuIsOpen) {
      root.style.setProperty(
        "--header-height",
        `${header.getBoundingClientRect().height}px`
      );
    }
  }

  measureHeader();

  if ("ResizeObserver" in window && header) {
    const headerObserver = new ResizeObserver(measureHeader);
    headerObserver.observe(header);
  } else {
    window.addEventListener("resize", measureHeader, {
      passive: true
    });
  }

  if (document.fonts?.ready) {
    document.fonts.ready.then(measureHeader);
  }

  /* IMAGE FALLBACKS */

  const dessertIllustration = `
    <svg xmlns="http://www.w3.org/2000/svg"
      width="900" height="1000" viewBox="0 0 900 1000">
      <rect width="900" height="1000" fill="#f8f1f4"/>
      <circle cx="450" cy="430" r="245" fill="#f3dce5"/>
      <g stroke="#087f83" stroke-width="12"
        stroke-linejoin="round">
        <path d="m330 500 120 250 120-250Z" fill="#edc698"/>
        <path d="M330 500c-100-90 40-110 110-240
          0 110 210 150 130 240Z" fill="#f5a8c4"/>
      </g>
      <text x="450" y="850" fill="#643449"
        text-anchor="middle" font-family="Georgia,serif"
        font-size="28">A little scoop. A lot of happy.</text>
    </svg>
  `;

  const logoIllustration = `
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 90">
      <path d="M23 47h34L40 84Z"
        fill="#e7ba84" stroke="#087f83" stroke-width="3"/>
      <path d="M22 48C9 35 32 31 35 17
        39 25 56 24 52 34 68 36 67 49 57 50Z"
        fill="#d93675"/>
      <path d="m31 58 16 15m-6-15-8 10"
        stroke="#b48651" stroke-width="2"/>
    </svg>
  `;

  const dessertPlaceholder =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(dessertIllustration);

  const logoPlaceholder =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(logoIllustration);

  document.querySelectorAll("img").forEach((image) => {
    function showFallback() {
      if (image.dataset.fallback) return;

      image.dataset.fallback = "true";
      image.classList.add("image-failed");

      const isLogo = image.classList.contains("logo");

      if (!isLogo) {
        image.alt =
          `${image.alt || "Dessert"} — photograph unavailable; ` +
          "dessert illustration shown";
      }

      // Prevent responsive image sources from overriding the fallback.
      image.removeAttribute("srcset");
      image.removeAttribute("sizes");
      image.src = isLogo ? logoPlaceholder : dessertPlaceholder;
    }

    image.addEventListener("error", showFallback);

    if (image.complete && image.naturalWidth === 0) {
      showFallback();
    }
  });

  /* SCROLL REVEAL */

  let revealObserver;

  function revealAll() {
    revealObserver?.disconnect();

    document.querySelectorAll(".reveal").forEach((element) => {
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
        threshold: 0.08
      }
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("pending");
      revealObserver.observe(element);
    });
  }

  listenToMedia(reducedMotion, (event) => {
    if (event.matches) revealAll();
  });

  window.addEventListener("beforeprint", revealAll);

  /* CATEGORY HIGHLIGHT */

  const categoryLinks = [
    ...document.querySelectorAll(".menu-jump a")
  ];

  const categorySections = categoryLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function updateCategory() {
    const marker = header
      ? header.getBoundingClientRect().bottom + 100
      : 100;

    let currentSection = categorySections[0];

    categorySections.forEach((section) => {
      if (section.getBoundingClientRect().top <= marker) {
        currentSection = section;
      }
    });

    categoryLinks.forEach((link) => {
      const isCurrent =
        link.getAttribute("href") === `#${currentSection?.id}`;

      link.classList.toggle("selected", isCurrent);

      if (isCurrent) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  let scrollScheduled = false;

  window.addEventListener(
    "scroll",
    () => {
      if (scrollScheduled) return;

      scrollScheduled = true;

      requestAnimationFrame(() => {
        updateCategory();
        scrollScheduled = false;
      });
    },
    { passive: true }
  );

  updateCategory();

  /* FOOTER YEAR */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();