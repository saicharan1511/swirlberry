/* Swirlberry — Contact. Independent page JavaScript. */

(() => {
  "use strict";

  function initializeContactPage() {
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

    function listenForMediaChange(media, listener) {
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", listener);
      } else if (typeof media.addListener === "function") {
        media.addListener(listener);
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

    listenForMediaChange(darkPreference, (event) => {
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
      const direction = root.dir === "rtl" ? "ltr" : "rtl";

      applyDirection(direction);
      savePreference("swirlberry-direction", direction);
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
        measureHeader();
      }
    }

    menuButton?.addEventListener("click", () => {
      const isOpen =
        menuButton.getAttribute("aria-expanded") === "true";

      setMenu(!isOpen);
    });

    listenForMediaChange(desktop, () => {
      setMenu(false);
      measureHeader();
    });

    navigation?.addEventListener("click", (event) => {
      if (event.target instanceof Element &&
          event.target.closest("a")) {
        setMenu(false);
      }
    });

    document.addEventListener("click", (event) => {
      if (dropdown && !dropdown.contains(event.target)) {
        dropdown.open = false;
      }

      if (!desktop.matches && header &&
          !header.contains(event.target)) {
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

    dropdown?.addEventListener("pointerenter", (event) => {
      if (desktop.matches && event.pointerType === "mouse") {
        dropdown.open = true;
      }
    });

    dropdown?.addEventListener("pointerleave", (event) => {
      const focusIsInside = dropdown.contains(document.activeElement);

      if (desktop.matches &&
          event.pointerType === "mouse" &&
          !focusIsInside) {
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

    if (header && "ResizeObserver" in window) {
      const headerObserver = new ResizeObserver(measureHeader);
      headerObserver.observe(header);
    } else {
      window.addEventListener("resize", measureHeader, {
        passive: true
      });
    }

    /* IMAGE FALLBACK */

    const dessertIllustration = `
      <svg xmlns="http://www.w3.org/2000/svg"
        width="900" height="1000" viewBox="0 0 900 1000">
        <rect width="900" height="1000" fill="#f8f6f5"/>
        <circle cx="450" cy="430" r="230" fill="#f7e2eb"/>
        <g stroke="#087f83" stroke-width="12"
          stroke-linejoin="round">
          <path d="m330 500 120 250 120-250Z" fill="#edd2a8"/>
          <path d="m360 560 125 110m-100-155 125 110"
            fill="none" opacity=".45"/>
          <path
            d="M330 500c-100-90 40-110 110-240
            0 110 210 150 130 240Z"
            fill="#f4bed0"/>
        </g>
        <text x="450" y="850" fill="#242226"
          text-anchor="middle" font-family="Arial,sans-serif"
          font-size="26">A little scoop of happiness</text>
      </svg>
    `;

    const logoIllustration = `
      <svg xmlns="http://www.w3.org/2000/svg"
        width="80" height="80" viewBox="0 0 80 80">
        <path d="m25 44 15 30 15-30Z"
          fill="#efcc9a" stroke="#087f83" stroke-width="3"/>
        <path d="M25 44c-13-10-4-18 6-24
          5-3 9-9 9-15 0 14 24 20 15 39Z"
          fill="#d93675" stroke="#087f83"
          stroke-width="3" stroke-linejoin="round"/>
      </svg>
    `;

    function svgDataUrl(svg) {
      return "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(svg);
    }

    document.querySelectorAll("img").forEach((image) => {
      function showFallback() {
        if (image.dataset.fallback) return;

        image.dataset.fallback = "true";

        if (image.classList.contains("logo")) {
          image.src = svgDataUrl(logoIllustration);
          return;
        }

        image.classList.add("image-failed");

        image.alt =
          `${image.alt || "Dessert"} — photograph unavailable; ` +
          "dessert illustration shown";

        image.removeAttribute("srcset");
        image.src = svgDataUrl(dessertIllustration);
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

    if ("IntersectionObserver" in window && !reducedMotion.matches) {
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
          threshold: 0.06,
          rootMargin: "0px 0px 30px 0px"
        }
      );

      document.querySelectorAll(".reveal").forEach((element) => {
        // Keep direct anchor targets visible when navigating to them.
        if (window.location.hash &&
            element.id === window.location.hash.slice(1)) {
          return;
        }

        element.classList.add("pending");
        revealObserver.observe(element);
      });
    }

    listenForMediaChange(reducedMotion, (event) => {
      if (event.matches) revealAll();
    });

    window.addEventListener("beforeprint", revealAll);

    /* CONTACT FORM */

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");
    const contactTopic = document.getElementById("contactTopic");
    const contactPreference = document.getElementById("contactPreference");
    const contactPhone = document.getElementById("contactPhone");
    const partyDetails = [
      document.getElementById("eventDateField"),
      document.getElementById("guestCountField"),
      document.getElementById("eventLocationField")
    ];

    function updatePartyDetails() {
      const isPartyEnquiry =
        contactTopic?.value === "Party and bulk orders";

      partyDetails.forEach((field) => {
        if (field) field.hidden = !isPartyEnquiry;
      });
    }

    contactTopic?.addEventListener("change", updatePartyDetails);
    updatePartyDetails();

    function updatePhoneRequirement() {
      if (contactPhone && contactPreference) {
        contactPhone.required = contactPreference.value === "Phone";
      }
    }

    contactPreference?.addEventListener("change", updatePhoneRequirement);
    updatePhoneRequirement();

    contactForm?.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = document.getElementById("contactName");
      const messageInput = document.getElementById("contactMessage");

      nameInput.setCustomValidity(
        nameInput.value.trim() ? "" : "Please enter your name."
      );

      messageInput.setCustomValidity(
        messageInput.value.trim().length >= 10
          ? ""
          : "Please enter a message of at least ten characters."
      );

      if (!contactForm.reportValidity()) return;

      const data = new FormData(contactForm);

      const clean = (key) => String(data.get(key) || "").trim();
      const topic = clean("topic");

      const subject = `Swirlberry enquiry: ${topic}`;

      const body = [
        `Name: ${clean("name")}`,
        `Email: ${clean("email")}`,
        `Phone: ${clean("phone") || "Not provided"}`,
        `Topic: ${topic}`,
        `Preferred contact: ${clean("contactPreference") || "Email"}`
      ];

      if (topic === "Party and bulk orders") {
        body.push(
          `Event date: ${clean("eventDate") || "Not provided"}`,
          `Estimated guests: ${clean("guestCount") || "Not provided"}`,
          `Event area or delivery location: ${clean("eventLocation") || "Not provided"}`
        );
      }

      body.push("", clean("message"), "", "I consent to being contacted about this enquiry.");

      // Replace this sample address with your business email.
      const recipient = "hello@swirlberry.example";

      const mailto =
        `mailto:${recipient}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body.join("\r\n"))}`;

      if (formStatus) {
        formStatus.textContent =
          "Your email app has been requested. " +
          "Review the draft and press Send there. " +
          "If no app opens, copy your message into your email service. " +
          "This website has not sent your enquiry.";
      }

      window.location.href = mailto;
    });

    document.getElementById("contactName")
      ?.addEventListener("input", (event) => {
        event.target.setCustomValidity("");
      });

    document.getElementById("contactMessage")
      ?.addEventListener("input", (event) => {
        event.target.setCustomValidity("");
      });

    /* FOOTER YEAR */

    const yearElement = document.getElementById("year");

    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeContactPage,
      { once: true }
    );
  } else {
    initializeContactPage();
  }
})();