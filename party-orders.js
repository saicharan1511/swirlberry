/* Swirlberry — standalone Party & Bulk Orders */

(() => {
  "use strict";

  const BUSINESS_EMAIL = "hello@swirlberry.example";

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
      // Controls remain available without browser storage.
    }
  }

  function listenToMedia(query, handler) {
    if (query.addEventListener) {
      query.addEventListener("change", handler);
    } else {
      query.addListener(handler);
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

  /* MOBILE NAVIGATION */

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

  /* HOME DROPDOWN */

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

  /* VIEWPORT-AWARE HERO HEIGHT */

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

  document.fonts?.ready.then(measureHeader);

  /* IMAGE FALLBACKS */

  const dessertIllustration = `
    <svg xmlns="http://www.w3.org/2000/svg"
      width="900" height="1000" viewBox="0 0 900 1000">
      <rect width="900" height="1000" fill="#f8f1f4"/>
      <circle cx="450" cy="430" r="240" fill="#f2dce5"/>
      <g stroke="#087f83" stroke-width="12"
        stroke-linejoin="round">
        <path d="m330 500 120 250 120-250Z" fill="#e8c398"/>
        <path d="M330 500c-100-90 40-110 110-240
          0 110 210 150 130 240Z" fill="#efa4c0"/>
      </g>
      <text x="450" y="850" fill="#643449"
        text-anchor="middle" font-family="Georgia,serif"
        font-size="27">A little scoop. A lot of happy.</text>
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

      const isLogo = image.classList.contains("logo");

      image.dataset.fallback = "true";
      image.classList.add("image-failed");

      if (!isLogo) {
        image.alt =
          `${image.alt || "Celebration"} — photograph unavailable; ` +
          "dessert illustration shown";
      }

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
      { threshold: 0.08 }
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

  /* ENQUIRY BUILDER */

  const form = document.getElementById("partyForm");
  const dateInput = document.getElementById("eventDate");
  const occasionInput = document.getElementById("occasion");
  const packageInput = document.getElementById("partyIdea");

  const prepareButton = document.getElementById("prepareButton");
  const preview = document.getElementById("enquiryPreview");
  const previewText = document.getElementById("enquiryText");
  const emailLink = document.getElementById("emailLink");
  const setupNote = document.getElementById("emailSetupNote");
  const formStatus = document.getElementById("formStatus");

  function localToday() {
    const now = new Date();

    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join("-");
  }

  function refreshMinimumDate() {
    if (dateInput) {
      dateInput.min = localToday();
    }
  }

  refreshMinimumDate();

  dateInput?.addEventListener("focus", refreshMinimumDate);
  dateInput?.addEventListener("input", () => {
    dateInput.setCustomValidity("");
  });

  function clearPreview() {
    if (preview) preview.hidden = true;
    emailLink?.removeAttribute("href");

    if (formStatus) {
      formStatus.textContent = "";
    }
  }

  form?.addEventListener("input", clearPreview);
  form?.addEventListener("change", clearPreview);

  document.querySelectorAll("[data-occasion]").forEach((link) => {
    link.addEventListener("click", () => {
      if (occasionInput) {
        occasionInput.value = link.dataset.occasion;
      }

      clearPreview();
    });
  });

  document.querySelectorAll("[data-package]").forEach((link) => {
    link.addEventListener("click", () => {
      if (packageInput) {
        packageInput.value = link.dataset.package;
      }

      clearPreview();
    });
  });

  if (form && prepareButton) {
    prepareButton.hidden = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      refreshMinimumDate();
      dateInput?.setCustomValidity("");

      if (dateInput?.value && dateInput.value < localToday()) {
        dateInput.setCustomValidity(
          "Please choose today or a future date."
        );
      }

      if (!form.reportValidity()) return;

      const data = new FormData(form);

      function value(name, fallback = "Not provided") {
        const text = String(data.get(name) || "").trim();
        return text || fallback;
      }

      const dateParts = value("eventDate").split("-");

      const formattedDate = dateParts.length === 3
        ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
        : value("eventDate");

      const message = [
        "Hello Swirlberry,",
        "",
        "I would like to enquire about a party or bulk dessert order.",
        "",
        `Name: ${value("customerName")}`,
        `Email: ${value("customerEmail")}`,
        `Phone: ${value("customerPhone")}`,
        `Occasion: ${value("occasion")}`,
        `Preferred date: ${formattedDate}`,
        `Approximate guests: ${value("guestCount")}`,
        `Party idea: ${value("partyIdea", "Please help me choose")}`,
        `Event location: ${value("eventLocation")}`,
        "",
        "Additional details:",
        value("eventNotes", "No additional details provided."),
        "",
        "Please confirm suitable options, availability, pricing,",
        "and collection or delivery arrangements.",
        "",
        "Thank you."
      ].join("\n");

      const subject =
        `Party enquiry — ${value("occasion")} — ${formattedDate}`;

      previewText.textContent = message;
      preview.hidden = false;

      const emailConfigured =
        BUSINESS_EMAIL &&
        !BUSINESS_EMAIL.toLowerCase().endsWith(".example");

      if (emailConfigured) {
        emailLink.hidden = false;
        emailLink.href =
          `mailto:${BUSINESS_EMAIL}` +
          `?subject=${encodeURIComponent(subject)}` +
          `&body=${encodeURIComponent(message)}`;

        setupNote.textContent =
          "Review the draft in your email app, then send it when ready.";

        formStatus.textContent =
          "Your enquiry is ready to review. Nothing has been sent.";
      } else {
        emailLink.hidden = true;

        setupNote.textContent =
          "The business email address has not been configured. " +
          "You can copy the enquiry above.";

        formStatus.textContent =
          "Your enquiry has been prepared. Sending is unavailable " +
          "until a real business email address is added.";
      }
    });
  }

  /* FOOTER YEAR */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();