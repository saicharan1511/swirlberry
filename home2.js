/* Swirlberry — Home 2 Premium */

(() => {
  "use strict";

  function initialize() {
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

    function listenToMedia(media, callback) {
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", callback);
      } else if (typeof media.addListener === "function") {
        media.addListener(callback);
      }
    }

    /* LIGHT / DARK MODE */

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

      const label = `Switch to ${isDark ? "light" : "dark"} mode`;

      if (themeButton) {
        themeButton.setAttribute("aria-label", label);
        themeButton.title = label;

        const icon = themeButton.querySelector("svg");

        if (icon) {
          icon.innerHTML = isDark ? sunIcon : moonIcon;
        }
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

      const label =
        root.dir === "rtl"
          ? "Switch to left-to-right layout"
          : "Switch to right-to-left layout";

      if (directionButton) {
        directionButton.setAttribute("aria-label", label);
        directionButton.title = label;
      }
    }

    applyDirection(readPreference("swirlberry-direction"));

    directionButton?.addEventListener("click", () => {
      const direction = root.dir === "rtl" ? "ltr" : "rtl";

      applyDirection(direction);
      savePreference("swirlberry-direction", direction);
    });

    [themeButton, directionButton, menuButton].forEach((button) => {
      if (button) {
        button.hidden = false;
      }
    });

    document.body.classList.add("enhanced");

    /* MOBILE NAVIGATION */

    function setMenu(open, restoreFocus = false) {
      if (!navigation || !menuButton) {
        return;
      }

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
      if (event.key !== "Escape") {
        return;
      }

      if (dropdown?.open) {
        dropdown.open = false;
        dropdown.querySelector("summary")?.focus();
        return;
      }

      if (menuButton?.getAttribute("aria-expanded") === "true") {
        setMenu(false, true);
      }
    });

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

    /* VIEWPORT-AWARE HERO */

    function measureHeader() {
      if (!header) {
        return;
      }

      const menuIsOpen =
        navigation?.classList.contains("is-open");

      if (desktop.matches || !menuIsOpen) {
        const height = header.getBoundingClientRect().height;

        root.style.setProperty("--header-height", `${height}px`);
      }
    }

    measureHeader();

    if (header && "ResizeObserver" in window) {
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

        <circle cx="450" cy="410" r="220" fill="#fce5ee"/>

        <g
          fill="none"
          stroke="#087f83"
          stroke-width="12"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m330 500 120 250 120-250Z"/>
          <path
            d="M330 500c-100-90 40-110 110-240 0 110 210 150 130 240Z"
          />
          <path d="m365 525 105 170m65-170-105 170"/>
        </g>

        <text
          x="450"
          y="850"
          fill="#b8245e"
          text-anchor="middle"
          font-family="Georgia,serif"
          font-size="40"
        >Swirlberry</text>

        <text
          x="450"
          y="895"
          fill="#625e63"
          text-anchor="middle"
          font-family="Arial,sans-serif"
          font-size="21"
        >Dessert photograph unavailable</text>
      </svg>
    `;

    const placeholder =
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(fallbackIllustration);

    function showFallback(image) {
      if (image.dataset.fallback === "true") {
        return;
      }

      image.dataset.fallback = "true";

      if (!image.dataset.originalAlt) {
        image.dataset.originalAlt = image.alt;
      }

      image.classList.add("image-failed");

      image.alt =
        `${image.dataset.originalAlt || "Dessert"} — ` +
        "photograph unavailable; dessert illustration shown";

      image.removeAttribute("srcset");
      image.src = placeholder;
    }

    document.querySelectorAll("img:not(.logo)").forEach((image) => {
      image.addEventListener("error", () => {
        showFallback(image);
      });

      if (image.complete && image.naturalWidth === 0) {
        showFallback(image);
      }
    });

    /* SUNDAE SELECTION */

    const sundaeImage = document.getElementById("sundaeImage");
    const sundaeName = document.getElementById("sundaeName");
    const sundaeDescription =
      document.getElementById("sundaeDescription");

    const flavorPicker = document.querySelector(".flavor-picker");
    const flavorButtons = [
      ...document.querySelectorAll(".flavor-choice")
    ];

    const flavors = {
      chocolate: {
        name: "The Chocolate Reverie",
        description:
          "Deep cocoa notes, creamy scoops, and an indulgent " +
          "chocolate finish. A dessert made for taking it slow.",
        image:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb" +
          "?auto=format&fit=crop&w=1100&q=85",
        alt: "Chocolate ice cream with a rich dessert topping"
      },

      berry: {
        name: "The Berry Daydream",
        description:
          "Bright berry notes and a soft, creamy finish. " +
          "A cheerful little escape for your afternoon.",
        image:
          "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f" +
          "?auto=format&fit=crop&w=1100&q=85",
        alt: "A colorful ice cream serving with berry-inspired tones"
      },

      vanilla: {
        name: "The Vanilla Cloud",
        description:
          "Delicate vanilla notes and a beautifully smooth texture. " +
          "A timeless favorite with room for your imagination.",
        image:
          "https://images.unsplash.com/photo-1570197788417-0e82375c9371" +
          "?auto=format&fit=crop&w=1100&q=85",
        alt: "Creamy ice cream served as a classic dessert"
      }
    };

    let selectedFlavor = "chocolate";
    let imageRequest = 0;

    function selectFlavor(key) {
      const flavor = flavors[key];

      if (
        !flavor ||
        key === selectedFlavor ||
        !sundaeImage ||
        !sundaeName ||
        !sundaeDescription
      ) {
        return;
      }

      selectedFlavor = key;

      flavorButtons.forEach((button) => {
        const selected = button.dataset.flavor === key;

        button.classList.toggle("is-selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      });

      sundaeName.textContent = flavor.name;
      sundaeDescription.textContent = flavor.description;

      const currentRequest = ++imageRequest;
      const preloader = new Image();

      preloader.onload = () => {
        if (currentRequest !== imageRequest) {
          return;
        }

        sundaeImage.classList.remove("image-failed");
        delete sundaeImage.dataset.fallback;
        delete sundaeImage.dataset.originalAlt;

        sundaeImage.alt = flavor.alt;
        sundaeImage.src = flavor.image;

        if (
          !reducedMotion.matches &&
          typeof sundaeImage.animate === "function"
        ) {
          sundaeImage.animate(
            [
              { opacity: 0.4, transform: "scale(.98)" },
              { opacity: 1, transform: "scale(1)" }
            ],
            {
              duration: 420,
              easing: "ease-out"
            }
          );
        }
      };

      preloader.onerror = () => {
        if (currentRequest !== imageRequest) {
          return;
        }

        delete sundaeImage.dataset.fallback;
        sundaeImage.dataset.originalAlt = flavor.alt;
        showFallback(sundaeImage);
      };

      preloader.src = flavor.image;
    }

    if (
      flavorPicker &&
      sundaeImage &&
      sundaeName &&
      sundaeDescription
    ) {
      flavorPicker.hidden = false;

      flavorButtons.forEach((button) => {
        button.addEventListener("click", () => {
          selectFlavor(button.dataset.flavor);
        });
      });
    }

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

      revealElements.forEach((element) => {
        const siblings = [
          ...element.parentElement.children
        ].filter((child) => child.classList.contains("reveal"));

        const index = Math.max(0, siblings.indexOf(element));

        element.style.setProperty(
          "--reveal-delay",
          `${Math.min(index * 90, 270)}ms`
        );

        element.classList.add("pending");
        revealObserver.observe(element);
      });
    }

    listenToMedia(reducedMotion, (event) => {
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true
    });
  } else {
    initialize();
  }
})();