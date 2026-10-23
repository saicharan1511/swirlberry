/* Swirlberry — Offers. Independent page JavaScript. */

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
    const darkPreference = window.matchMedia("(prefers-color-scheme: dark)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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
            // Controls work when browser storage is unavailable.
        }
    }

    function watchMedia(query, callback) {
        if (query.addEventListener) {
            query.addEventListener("change", callback);
        } else {
            query.addListener(callback);
        }
    }

    let chosenTheme = readPreference("swirlberry-theme");

    const moonIcon = `
    <path d="M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z"/>
  `;

    const sunIcon = `
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>
  `;

    function applyTheme(theme) {
        const isDark = theme === "dark";
        root.dataset.theme = isDark ? "dark" : "light";

        const label = `Switch to ${isDark ? "light" : "dark"} mode`;
        themeButton.setAttribute("aria-label", label);
        themeButton.title = label;
        themeButton.querySelector("svg").innerHTML = isDark ? sunIcon : moonIcon;

        document.querySelector('meta[name="theme-color"]')
            ?.setAttribute("content", isDark ? "#151416" : "#D93675");
    }

    applyTheme(
        chosenTheme === "dark" || chosenTheme === "light"
            ? chosenTheme
            : darkPreference.matches ? "dark" : "light"
    );

    themeButton.addEventListener("click", () => {
        chosenTheme = root.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(chosenTheme);
        savePreference("swirlberry-theme", chosenTheme);
    });

    watchMedia(darkPreference, (event) => {
        if (chosenTheme !== "light" && chosenTheme !== "dark") {
            applyTheme(event.matches ? "dark" : "light");
        }
    });

    function applyDirection(direction) {
        root.dir = direction === "rtl" ? "rtl" : "ltr";

        const label = root.dir === "rtl"
            ? "Switch to left-to-right layout"
            : "Switch to right-to-left layout";

        directionButton.setAttribute("aria-label", label);
        directionButton.title = label;
    }

    applyDirection(readPreference("swirlberry-direction"));

    directionButton.addEventListener("click", () => {
        const direction = root.dir === "rtl" ? "ltr" : "rtl";
        applyDirection(direction);
        savePreference("swirlberry-direction", direction);
        measureHeader();
    });

    [themeButton, directionButton, menuButton].forEach((button) => {
        button.hidden = false;
    });

    document.body.classList.add("enhanced");

    function setMenu(open, restoreFocus = false) {
        navigation.classList.toggle("is-open", open);
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute(
            "aria-label",
            open ? "Close navigation" : "Open navigation"
        );

        if (!open) dropdown.open = false;
        if (restoreFocus) menuButton.focus();

        measureHeader();
    }

    menuButton.addEventListener("click", () => {
        setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });

    watchMedia(desktop, () => {
        setMenu(false);
    });

    navigation.addEventListener("click", (event) => {
        if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target)) dropdown.open = false;

        if (!desktop.matches && !header.contains(event.target)) {
            setMenu(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        if (dropdown.open) {
            dropdown.open = false;
            dropdown.querySelector("summary").focus();
            return;
        }

        if (menuButton.getAttribute("aria-expanded") === "true") {
            setMenu(false, true);
        }
    });

    dropdown.addEventListener("pointerenter", (event) => {
        if (desktop.matches && event.pointerType === "mouse") {
            dropdown.open = true;
        }
    });

    dropdown.addEventListener("pointerleave", (event) => {
        if (
            desktop.matches &&
            event.pointerType === "mouse" &&
            !dropdown.contains(document.activeElement)
        ) {
            dropdown.open = false;
        }
    });

    dropdown.addEventListener("focusout", (event) => {
        if (!dropdown.contains(event.relatedTarget)) dropdown.open = false;
    });

    function measureHeader() {
        if (desktop.matches || !navigation.classList.contains("is-open")) {
            const height = header.getBoundingClientRect().height;
            root.style.setProperty("--header-height", `${height}px`);
        }
    }

    measureHeader();

    if ("ResizeObserver" in window) {
        new ResizeObserver(measureHeader).observe(header);
    } else {
        window.addEventListener("resize", measureHeader, { passive: true });
    }

    /* Dessert fallback for unavailable remote images. */
    const dessertIllustration = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1000"
      viewBox="0 0 900 1000">
      <rect width="900" height="1000" fill="#f8f1f4"/>
      <circle cx="450" cy="420" r="220" fill="#f4dce6"/>
      <g stroke="#087f83" stroke-width="10" stroke-linejoin="round">
        <path d="m330 500 120 280 120-280Z" fill="#e8c59b"/>
        <path d="m365 580 140 90m-112-30 85-100" fill="none"/>
        <circle cx="385" cy="440" r="82" fill="#f4a9c5"/>
        <circle cx="515" cy="440" r="82" fill="#fff0df"/>
        <circle cx="450" cy="335" r="82" fill="#d93675"/>
      </g>
      <text x="450" y="875" fill="#742547" text-anchor="middle"
        font-family="Georgia,serif" font-size="38">A little scoop of joy.</text>
    </svg>
  `;

    const dessertPlaceholder =
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(dessertIllustration);

    /* Keep a missing logo compact rather than replacing it with a photo. */
    const logoIllustration = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <path d="m20 35 12 25 12-25" fill="#e8c59b"
        stroke="#087f83" stroke-width="3" stroke-linejoin="round"/>
      <path d="M17 34c-5-9 7-12 12-22 0 8 22 13 18 22Z"
        fill="#d93675" stroke="#087f83" stroke-width="3"
        stroke-linejoin="round"/>
    </svg>
  `;

    const logoPlaceholder =
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(logoIllustration);

    document.querySelectorAll("img").forEach((image) => {
        function showFallback() {
            if (image.dataset.fallback) return;

            image.dataset.fallback = "true";

            if (image.classList.contains("logo")) {
                image.src = logoPlaceholder;
                return;
            }

            image.classList.add("image-failed");
            image.alt = "Dessert illustration — original photograph unavailable";
            image.removeAttribute("srcset");
            image.src = dessertPlaceholder;
        }

        image.addEventListener("error", showFallback);

        if (image.complete && image.naturalWidth === 0) {
            showFallback();
        }
    });

    /* Scroll animations remain optional and respect reduced motion. */
    let revealObserver;

    function revealAll() {
        revealObserver?.disconnect();

        document.querySelectorAll(".reveal").forEach((element) => {
            element.classList.remove("pending");
            element.classList.add("is-visible");
        });
    }

    if ("IntersectionObserver" in window && !reducedMotion.matches) {
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.remove("pending");
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.08 });

        document.querySelectorAll(".reveal").forEach((element) => {
            element.classList.add("pending");
            revealObserver.observe(element);
        });
    }

    watchMedia(reducedMotion, (event) => {
        if (event.matches) revealAll();
    });

    window.addEventListener("beforeprint", revealAll);

    const yearElement = document.getElementById("year");
    if (yearElement) yearElement.textContent = new Date().getFullYear();
})();