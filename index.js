/* Swirlberry — Home 1 Classic */

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

  /* Browser storage is optional. */
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
      // Controls remain functional when storage is unavailable.
    }
  }

  let chosenTheme = readPreference("swirlberry-theme");

  const moonIcon = `
    <path
      d="M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z"
    />
  `;

  const sunIcon = `
    <circle cx="12" cy="12" r="4"/>
    <path
      d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"
    />
  `;

  /* LIGHT / DARK MODE */
  function applyTheme(theme) {
    const isDark = theme === "dark";

    root.dataset.theme = isDark ? "dark" : "light";

    const label = `Switch to ${isDark ? "light" : "dark"} mode`;

    themeButton.setAttribute("aria-label", label);
    themeButton.title = label;

    themeButton.querySelector("svg").innerHTML = isDark
      ? sunIcon
      : moonIcon;
  }

  const initialTheme =
    chosenTheme === "dark" || chosenTheme === "light"
      ? chosenTheme
      : darkPreference.matches
        ? "dark"
        : "light";

  applyTheme(initialTheme);

  themeButton.addEventListener("click", () => {
    chosenTheme =
      root.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(chosenTheme);
    savePreference("swirlberry-theme", chosenTheme);
  });

  darkPreference.addEventListener("change", (event) => {
    const hasExplicitPreference =
      chosenTheme === "light" || chosenTheme === "dark";

    if (!hasExplicitPreference) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });

  /* RTL / LTR */
  function applyDirection(direction) {
    root.dir = direction === "rtl" ? "rtl" : "ltr";

    const label =
      root.dir === "rtl"
        ? "Switch to left-to-right layout"
        : "Switch to right-to-left layout";

    directionButton.setAttribute("aria-label", label);
    directionButton.title = label;
  }

  applyDirection(readPreference("swirlberry-direction"));

  directionButton.addEventListener("click", () => {
    const nextDirection = root.dir === "rtl" ? "ltr" : "rtl";

    applyDirection(nextDirection);
    savePreference("swirlberry-direction", nextDirection);
  });

  /* Enable controls only when JavaScript is available. */
  [themeButton, directionButton, menuButton].forEach((button) => {
    button.hidden = false;
  });

  document.body.classList.add("enhanced");

  /* MOBILE NAVIGATION */
  function setMenu(open, restoreFocus = false) {
    navigation.classList.toggle("is-open", open);

    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation"
    );

    if (!open) {
      dropdown.open = false;
    }

    if (restoreFocus) {
      menuButton.focus();
    }
  }

  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    setMenu(!isOpen);
  });

  desktop.addEventListener("change", () => {
    setMenu(false);
    measureHeader();
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenu(false);
    }
  });

  /* Close disclosures when clicking outside. */
  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.open = false;
    }

    if (!desktop.matches && !header.contains(event.target)) {
      setMenu(false);
    }
  });

  /* Escape closes the nearest open navigation layer. */
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (dropdown.open) {
      dropdown.open = false;
      dropdown.querySelector("summary").focus();
      return;
    }

    if (menuButton.getAttribute("aria-expanded") === "true") {
      setMenu(false, true);
    }
  });

  /*
   * Native details/summary supports keyboard and touch.
   * Mouse hover adds a convenience behavior on desktop.
   */
  dropdown.addEventListener("pointerenter", (event) => {
    if (desktop.matches && event.pointerType === "mouse") {
      dropdown.open = true;
    }
  });

  dropdown.addEventListener("pointerleave", (event) => {
    const focusIsInside = dropdown.contains(
      document.activeElement
    );

    if (event.pointerType === "mouse" && !focusIsInside) {
      dropdown.open = false;
    }
  });

  dropdown.addEventListener("focusout", (event) => {
    if (!dropdown.contains(event.relatedTarget)) {
      dropdown.open = false;
    }
  });

  /* VIEWPORT-AWARE HERO HEIGHT */
  function measureHeader() {
    const mobileMenuIsOpen =
      navigation.classList.contains("is-open");

    /*
     * Keep the resting header height while the mobile
     * navigation panel is expanded.
     */
    if (desktop.matches || !mobileMenuIsOpen) {
      const height = header.getBoundingClientRect().height;

      root.style.setProperty(
        "--header-height",
        `${height}px`
      );
    }
  }

  measureHeader();

  if ("ResizeObserver" in window) {
    const headerObserver = new ResizeObserver(measureHeader);
    headerObserver.observe(header);
  } else {
    window.addEventListener("resize", measureHeader, {
      passive: true
    });
  }

  /* IMAGE FALLBACK */
  const fallbackIllustration = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="900"
      height="1000"
      viewBox="0 0 900 1000"
    >
      <rect width="900" height="1000" fill="#f8f6f5"/>

      <g
        fill="none"
        stroke="#087F83"
        stroke-width="12"
        stroke-linejoin="round"
      >
        <path d="m330 500 120 250 120-250Z"/>
        <path
          d="M330 500c-100-90 40-110 110-240 0 110 210 150 130 240Z"
        />
      </g>

      <text
        x="450"
        y="850"
        fill="#242226"
        text-anchor="middle"
        font-family="Arial,sans-serif"
        font-size="26"
      >
        Dessert photo unavailable
      </text>
    </svg>
  `;

  const placeholder =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(fallbackIllustration);

  document.querySelectorAll("img").forEach((image) => {
    function showFallback() {
      if (image.dataset.fallback) {
        return;
      }

      image.dataset.fallback = "true";
      image.classList.add("image-failed");

      image.alt =
        `${image.alt} — photograph unavailable; ` +
        "dessert illustration shown";

      image.src = placeholder;
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
    });
  }

  if (
    "IntersectionObserver" in window &&
    !reducedMotion.matches
  ) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

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
      revealObserver.observe(element);
      element.classList.add("pending");
    });
  }

  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      revealAll();
    }
  });

  window.addEventListener("beforeprint", revealAll);

  /* FOOTER YEAR */
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();