/* Swirlberry — Services */

(() => {
    "use strict";

    const root = document.documentElement;
    const themeButton = document.getElementById("themeToggle");
    const directionButton = document.getElementById("directionToggle");
    const menuButton = document.getElementById("mobileToggle");
    const navigation = document.getElementById("navigation");
    const dropdown = document.getElementById("homeDropdown");
    const header = document.querySelector(".site-header");

    const desktop = matchMedia("(min-width: 1251px)");
    const systemTheme = matchMedia("(prefers-color-scheme: dark)");
    const moonIcon =
        '<path d="M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z"/>';
    const sunIcon =
        '<circle cx="12" cy="12" r="4"/>' +
        '<path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>';

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
            // Controls still work without browser storage.
        }
    }

    let chosenTheme = readPreference("swirlberry-theme");

    function applyTheme(theme) {
        const dark = theme === "dark";

        root.dataset.theme = dark ? "dark" : "light";
        themeButton.querySelector("svg").innerHTML =
            dark ? sunIcon : moonIcon;

        const label = `Switch to ${dark ? "light" : "dark"} mode`;

        themeButton.setAttribute("aria-label", label);
        themeButton.title = label;
    }

    applyTheme(
        ["light", "dark"].includes(chosenTheme)
            ? chosenTheme
            : systemTheme.matches
                ? "dark"
                : "light"
    );

    themeButton.addEventListener("click", () => {
        chosenTheme = root.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(chosenTheme);
        savePreference("swirlberry-theme", chosenTheme);
    });

    systemTheme.addEventListener("change", (event) => {
        if (!["light", "dark"].includes(chosenTheme)) {
            applyTheme(event.matches ? "dark" : "light");
        }
    });

    function applyDirection(direction) {
        root.dir = direction === "rtl" ? "rtl" : "ltr";

        const label = root.dir === "rtl"
            ? "Switch to left-to-right layout"
            : "Switch to right-to-left layout";

        directionButton.title = label;
        directionButton.setAttribute("aria-label", label);
    }

    applyDirection(readPreference("swirlberry-direction"));

    [themeButton, directionButton, menuButton].forEach((button) => {
        button.hidden = false;
    });
    document.body.classList.add("enhanced");

    directionButton.addEventListener("click", () => {
        const direction = root.dir === "rtl" ? "ltr" : "rtl";
        applyDirection(direction);
        savePreference("swirlberry-direction", direction);
    });

    function setMenu(open, restoreFocus = false) {
        navigation.classList.toggle("is-open", open);
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute(
            "aria-label",
            open ? "Close navigation" : "Open navigation"
        );

        if (!open) dropdown.open = false;
        if (restoreFocus) menuButton.focus();
    }

    menuButton.addEventListener("click", () => {
        setMenu(menuButton.getAttribute("aria-expanded") !== "true");
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
        } else if (menuButton.getAttribute("aria-expanded") === "true") {
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
            root.style.setProperty(
                "--header-height",
                `${header.getBoundingClientRect().height}px`
            );
        }
    }

    desktop.addEventListener("change", () => {
        setMenu(false);
        measureHeader();
    });

    if ("ResizeObserver" in window) {
        new ResizeObserver(measureHeader).observe(header);
    } else {
        window.addEventListener("resize", measureHeader);
    }

    measureHeader();

    const fallback = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1000">
      <rect width="900" height="1000" fill="#f8f6f5"/>
      <circle cx="450" cy="370" r="140" fill="#d93675"/>
      <path d="m310 490 140 280 140-280Z" fill="#087f83"/>
      <text x="450" y="850" text-anchor="middle"
            font-family="Georgia" font-size="38" fill="#242226">
        Swirlberry
      </text>
    </svg>
  `;

    document.querySelectorAll("img").forEach((image) => {
        function showFallback() {
            if (image.dataset.fallback) return;

            image.dataset.fallback = "true";
            image.removeAttribute("srcset");
            image.src = "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(fallback);
            image.alt += " — illustration shown; photo unavailable";
        }

        image.addEventListener("error", showFallback);

        if (image.complete && image.naturalWidth === 0) {
            showFallback();
        }
    });

    document.getElementById("year").textContent =
        new Date().getFullYear();
})();