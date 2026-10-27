/* Swirlberry — Order Now */

(() => {
    "use strict";

    const root = document.documentElement;
    const get = (id) => document.getElementById(id);

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
            // Controls work even when storage is unavailable.
        }
    }

    /* LIGHT / DARK MODE */

    const systemTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
    );

    let chosenTheme = readPreference("swirlberry-theme");

    function applyTheme(theme) {
        const isDark = theme === "dark";

        root.dataset.theme = isDark ? "dark" : "light";

        const themeToggle = get("themeToggle");
        const label = `Switch to ${isDark ? "light" : "dark"} mode`;

        themeToggle.setAttribute("aria-label", label);
        themeToggle.title = label;
        themeToggle.querySelector("svg").innerHTML = isDark
            ? `<circle cx="12" cy="12" r="4"/>
               <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>`
            : `<path d="M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z"/>`;
    }

    applyTheme(
        ["light", "dark"].includes(chosenTheme)
            ? chosenTheme
            : systemTheme.matches
                ? "dark"
                : "light"
    );

    get("themeToggle").addEventListener("click", () => {
        chosenTheme =
            root.dataset.theme === "dark" ? "light" : "dark";

        applyTheme(chosenTheme);
        savePreference("swirlberry-theme", chosenTheme);
    });

    systemTheme.addEventListener("change", (event) => {
        if (!["light", "dark"].includes(chosenTheme)) {
            applyTheme(event.matches ? "dark" : "light");
        }
    });

    /* RTL / LTR */

    function applyDirection(direction) {
        root.dir = direction === "rtl" ? "rtl" : "ltr";

        const label = `Switch to ${root.dir === "rtl" ? "left-to-right" : "right-to-left"
            } layout`;
        const directionToggle = get("directionToggle");

        directionToggle.setAttribute("aria-label", label);
        directionToggle.title = label;
    }

    applyDirection(readPreference("swirlberry-direction"));

    get("directionToggle").addEventListener("click", () => {
        applyDirection(root.dir === "rtl" ? "ltr" : "rtl");

        savePreference("swirlberry-direction", root.dir);
    });

    get("themeToggle").hidden = false;
    get("directionToggle").hidden = false;

    /* LOGO / IMAGE FALLBACK */

    const fallbackSVG = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
    >
      <path
        d="M18 36h28L32 61Z"
        fill="#087f83"
      />
      <path
        d="M17 33c-8-9 5-12 9-18 3-4 5-8 5-13
           14 9 7 15 14 20 10 7 2 13-4 13H22Z"
        fill="#d93675"
      />
    </svg>
  `;

    const fallbackImage =
        "data:image/svg+xml," + encodeURIComponent(fallbackSVG);

    get("brandLogo").addEventListener(
        "error",
        () => {
            get("brandLogo").src = fallbackImage;
        },
        { once: true }
    );

    /* MENU */

    const products = [
        {
            name: "Berry Daydream",
            price: 140,
            description: "Bright berry notes. One creamy, happy scoop.",
            photo: "1497034825429-c343d7c6a68f",
            image: "berry-daydream.png"
        },
        {
            name: "Midnight Chocolate",
            price: 160,
            description: "Rich cocoa with a beautifully velvety finish.",
            photo: "1563805042-7684c019e1cb",
            image: "midnight-chocolate.png"
        },
        {
            name: "Vanilla Cloud",
            price: 130,
            description: "A timeless single scoop with delicate vanilla.",
            photo: "1570197788417-0e82375c9371"
        },
        {
            name: "Caramel Crush",
            price: 150,
            description: "Silky caramel sweetness in every spoonful.",
            photo: "1517093157656-b9eccef91cb1"
        },
        {
            name: "Mango Sunshine",
            price: 155,
            description: "Juicy mango flavor with a bright, creamy finish.",
            photo: "1560008581-09826d1de69e",
            image: "mango-sunshine.png"
        },
        {
            name: "Pistachio Picnic",
            price: 175,
            description: "A smooth pistachio scoop with a delicate nutty note.",
            photo: "1501446529957-6226bd447c46",
            image: "pistachio-picnic.png"
        },
        {
            name: "Cookie Crumble",
            price: 165,
            description: "Creamy vanilla folded with crunchy cookie pieces.",
            photo: "1563805042-7684c019e1cb",
            image: "cookie-crumble.png"
        },
        {
            name: "Strawberry Cheesecake",
            price: 180,
            description: "Sweet strawberry swirls with a cheesecake-inspired finish.",
            photo: "1497034825429-c343d7c6a68f",
            image: "strawberry-cheesecake.png"
        }
    ];

    const quantities = products.map(() => 0);
    const maximumQuantity = 20;

    function formatMoney(value) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(value);
    }

    function calculateTotal() {
        return products.reduce(
            (sum, product, index) =>
                sum + product.price * quantities[index],
            0
        );
    }

    get("products").innerHTML = products
        .map(
            (product, index) => `
        <article class="product">
          <img
            src="${product.image || `https://images.unsplash.com/photo-${product.photo}?auto=format&fit=crop&w=600&q=80`}"
            alt="${product.name} serving suggestion"
            loading="lazy"
          >

          <div class="product-copy">
            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <div class="product-bottom">
              <strong>${formatMoney(product.price)}</strong>

              <button
                class="add"
                type="button"
                data-add="${index}"
                aria-label="Add ${product.name}"
              >
                + Add
              </button>
            </div>
          </div>
        </article>
      `
        )
        .join("");

    document.querySelectorAll(".product img").forEach((image) => {
        image.addEventListener(
            "error",
            () => {
                image.src = fallbackImage;
                image.style.objectFit = "contain";
                image.alt = "Swirlberry dessert illustration";
            },
            { once: true }
        );
    });

    /* CART */

    function renderCart() {
        const hasItems = quantities.some(Boolean);

        get("cart").innerHTML = hasItems
            ? products
                .map((product, index) => {
                    if (!quantities[index]) {
                        return "";
                    }

                    return `
              <div class="cart-row">
                <div>
                  <strong>${product.name}</strong>

                  <span>
                    ${formatMoney(
                        product.price * quantities[index]
                    )}
                  </span>
                </div>

                <div class="quantity">
                  <button
                    type="button"
                    data-change="${index}"
                    data-delta="-1"
                    aria-label="Remove one ${product.name}"
                  >
                    −
                  </button>

                  <span>${quantities[index]}</span>

                  <button
                    type="button"
                    data-change="${index}"
                    data-delta="1"
                    aria-label="Add one ${product.name}"
                    ${quantities[index] >= maximumQuantity
                            ? "disabled"
                            : ""
                        }
                  >
                    +
                  </button>
                </div>
              </div>
            `;
                })
                .join("")
            : `
          <p class="note">
            Your bag is waiting for a little sweetness.
            Add a treat to begin.
          </p>
        `;

        get("total").textContent = formatMoney(calculateTotal());
        get("reviewButton").disabled = !hasItems;

        document.querySelectorAll("[data-add]").forEach((button) => {
            const index = Number(button.dataset.add);

            button.disabled =
                quantities[index] >= maximumQuantity;
        });
    }

    get("products").addEventListener("click", (event) => {
        const button = event.target.closest("[data-add]");

        if (!button) {
            return;
        }

        const index = Number(button.dataset.add);

        quantities[index] = Math.min(
            maximumQuantity,
            quantities[index] + 1
        );

        renderCart();

        get("message").textContent =
            `${products[index].name} added to your bag.`;
    });

    get("cart").addEventListener("click", (event) => {
        const button = event.target.closest("[data-change]");

        if (!button) {
            return;
        }

        const index = Number(button.dataset.change);
        const delta = Number(button.dataset.delta);

        quantities[index] = Math.max(
            0,
            Math.min(
                maximumQuantity,
                quantities[index] + delta
            )
        );

        renderCart();

        const replacement = get("cart").querySelector(
            `[data-change="${index}"][data-delta="${delta}"]`
        );

        const focusTarget =
            replacement && !replacement.disabled
                ? replacement
                : document.querySelector(`[data-add="${index}"]`);

        focusTarget.focus();

        get("message").textContent =
            `${products[index].name}: ` +
            `${quantities[index]} in your bag.`;
    });

    /* PICKUP / DELIVERY */

    const form = get("orderForm");

    form.addEventListener("change", () => {
        const isDelivery =
            form.elements.fulfilment.value === "delivery";

        get("addressGroup").hidden = !isDelivery;
        get("address").disabled = !isDelivery;
        get("address").required = isDelivery;
    });

    /* ORDER PREVIEW */

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!quantities.some(Boolean)) {
            return;
        }

        const nameInput = get("name");
        const addressInput = get("address");

        nameInput.setCustomValidity(
            nameInput.value.trim()
                ? ""
                : "Please enter your name."
        );

        addressInput.setCustomValidity(
            !addressInput.required || addressInput.value.trim()
                ? ""
                : "Please enter your delivery address."
        );

        if (!form.reportValidity()) {
            return;
        }

        const selection = products
            .map((product, index) => {
                if (!quantities[index]) {
                    return "";
                }

                return (
                    `${quantities[index]} × ${product.name} — ` +
                    formatMoney(product.price * quantities[index])
                );
            })
            .filter(Boolean)
            .join("\n");

        const fulfilment =
            form.elements.fulfilment.value === "delivery"
                ? `Delivery to: ${addressInput.value.trim()}`
                : "Pickup at the parlour";

        const notes = get("notes").value.trim();

        get("reviewText").textContent =
            `${nameInput.value.trim()}, here is your selection:\n\n` +
            selection +
            `\n\nTotal: ${formatMoney(calculateTotal())}` +
            `\n${fulfilment}` +
            (notes ? `\n\nSpecial requests: ${notes}` : "");

        get("reviewDialog").showModal();
    });

    ["name", "address"].forEach((id) => {
        get(id).addEventListener("input", () => {
            get(id).setCustomValidity("");
        });
    });

    get("closeDialog").addEventListener("click", () => {
        get("reviewDialog").close();
    });

    renderCart();
})();