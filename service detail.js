/* Swirlberry — Six independent service experiences */

(() => {
    "use strict";

    const photo = (id) =>
        `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

    const services = {
        "artisan-scoops": {
            title: "Artisan Ice Cream",
            badge: "Everyday indulgence",
            headline: "Made fresh. Scooped with love.",
            description:
                "Small-batch ice cream, slow-churned for a beautifully creamy " +
                "finish. Choose classic comforts or something deliciously unexpected.",
            image: photo("photo-1563805042-7684c019e1cb"),
            storyImage: "artisan-icecream-experience.png",
            storyTitle: "A little scoop.<br><em>A lot of happiness.</em>",
            story:
                "Enjoy a moment made just for you. Explore familiar favourites, " +
                "seasonal inspirations and thoughtful finishing touches, all " +
                "served with the Swirlberry warmth you love.",
            includes: [
                "Classic and seasonal flavour selections",
                "Single, double and sharing portions",
                "Your choice of cup, cone and toppings"
            ],
            benefits: [
                {
                    title: "Small-batch texture",
                    text: "Slow-churned batches bring a smooth, creamy finish to every scoop."
                },
                {
                    title: "Flavours to explore",
                    text: "Find a comforting classic or discover a seasonal combination."
                },
                {
                    title: "Finished your way",
                    text: "Choose the portion, cone and toppings that make it yours."
                }
            ],
            unit: "serving",
            prices: ["₹120", "₹220", "₹340"],
            packages: [
                {
                    name: "Classic Scoop",
                    description: "A simple moment of everyday indulgence.",
                    items: ["Single scoop", "Classic flavour selection", "Cup or cone"]
                },
                {
                    name: "Signature Duo",
                    description: "A little more flavour to fall in love with.",
                    items: ["Double scoop", "Two flavour choices", "A finishing topping"]
                },
                {
                    name: "Sharing Treat",
                    description: "A generous selection for a sweet moment together.",
                    items: ["Sharing portion", "A choice of flavours", "Selected toppings"]
                }
            ],
            faqs: [
                [
                    "Which ice cream flavours can I choose?",
                    "The selection changes with availability and seasonal ingredients. " +
                    "Ask our team for the flavours available when you order."
                ],
                [
                    "Can I combine flavours in one serving?",
                    "Yes. Double and sharing portions can include multiple flavours, " +
                    "subject to the selected package and availability."
                ],
                [
                    "Do you offer dairy-free ice cream?",
                    "Ask our team about the options available that day. Please discuss " +
                    "dietary requirements and allergies before ordering."
                ],
                [
                    "Can I order ice cream for a gathering?",
                    "Yes. Share your guest count and timing so we can discuss " +
                    "portions, storage and suitable serving arrangements."
                ]
            ]
        },

        "sundae-bar": {
            title: "Signature Sundae Bar",
            badge: "Made your way",
            headline: "Build a little happiness.",
            description:
                "Silky scoops meet flowing sauces, crunchy toppings and fresh " +
                "finishes. Create a sundae that feels entirely your own.",
            image: photo("photo-1570197788417-0e82375c9371"),
            storyImage:"sundaeimgser.webp",
            storyTitle: "Your favourites.<br><em>Beautifully brought together.</em>",
            story:
                "Begin with your favourite ice cream, add a sauce you love and " +
                "finish with a little crunch. Our sundae experience makes every " +
                "combination feel like a special occasion.",
            includes: [
                "Ice cream and sauce pairings",
                "Crunchy, fruity and indulgent toppings",
                "Individual and sharing sundae options"
            ],
            benefits: [
                {
                    title: "Made to order",
                    text: "Your sundae is assembled around your selected flavours and finishes."
                },
                {
                    title: "Delicious contrasts",
                    text: "Creamy scoops, smooth sauces and crunchy toppings come together."
                },
                {
                    title: "Perfect for sharing",
                    text: "Choose a generous sundae and make the table a little happier."
                }
            ],
            unit: "sundae",
            prices: ["₹240", "₹360", "₹520"],
            packages: [
                {
                    name: "Classic Sundae",
                    description: "The combination you will always come back to.",
                    items: ["Selected ice cream", "One sauce", "A crunchy topping"]
                },
                {
                    name: "Signature Creation",
                    description: "Extra layers of flavour and texture.",
                    items: ["Two flavour choices", "Sauce combination", "Premium finishing touches"]
                },
                {
                    name: "Sharing Sundae",
                    description: "A generous treat for your favourite company.",
                    items: ["Sharing-size portion", "A selection of toppings", "Multiple flavour choices"]
                }
            ],
            faqs: [
                [
                    "Can I build my own sundae?",
                    "Yes. Choose from the available ice cream flavours, sauces and " +
                    "toppings. Our team can help suggest combinations."
                ],
                [
                    "Are warm sauces available?",
                    "Ask about the sauces available that day. Warm sauce options " +
                    "depend on the menu and serving arrangements."
                ],
                [
                    "Can children choose their own toppings?",
                    "Yes. Please let us know about allergies and any ingredients " +
                    "you would like us to avoid before preparation."
                ],
                [
                    "Can you arrange a sundae bar for an event?",
                    "Contact us with the date, venue and guest count. We can discuss " +
                    "a suitable menu and any equipment or staffing requirements."
                ]
            ]
        },

        "dessert-catering": {
            title: "Dessert Catering",
            badge: "For beautiful gatherings",
            headline: "A sweeter kind of gathering.",
            description:
                "A curated dessert table for weddings, office celebrations and " +
                "intimate gatherings, styled around your occasion.",
            image: photo("photo-1565958011703-44f9829ba187"),
            storyImage: photo("photo-1488477181946-6428a0291777"),
            storyTitle: "A beautiful table.<br><em>A lasting impression.</em>",
            story:
                "Bring your guests together over a thoughtful dessert selection. " +
                "We help shape the flavours, portions and presentation around " +
                "your event, making the sweet part feel effortless.",
            includes: [
                "Dessert menu planning for your guest list",
                "Presentation and serving consultation",
                "Optional staffed serving arrangements"
            ],
            benefits: [
                {
                    title: "Thoughtfully curated",
                    text: "A coordinated dessert selection brings variety and balance to your table."
                },
                {
                    title: "Planned around guests",
                    text: "Portions and combinations are discussed around your guest count."
                },
                {
                    title: "Beautiful presentation",
                    text: "Serving details are considered alongside the flavours and occasion."
                }
            ],
            unit: "guest",
            prices: ["₹280", "₹420", "₹650"],
            packages: [
                {
                    name: "Intimate Gathering",
                    description: "A thoughtful selection for a smaller occasion.",
                    items: ["Curated dessert selection", "Portion planning", "Presentation guidance"]
                },
                {
                    name: "Signature Table",
                    description: "More variety for a memorable celebration.",
                    items: ["Expanded dessert menu", "Coordinated presentation", "Serving consultation"]
                },
                {
                    name: "Grand Celebration",
                    description: "A tailored dessert experience for your event.",
                    items: ["Personalised menu planning", "Event presentation consultation", "Staffing options on request"]
                }
            ],
            faqs: [
                [
                    "Which occasions do you cater for?",
                    "We can discuss weddings, birthdays, office celebrations and " +
                    "private gatherings. Availability depends on the date and location."
                ],
                [
                    "Is there a minimum guest count?",
                    "Minimum quantities depend on your menu and event arrangements. " +
                    "Share your plans so we can confirm a suitable option."
                ],
                [
                    "Are setup and serving staff included?",
                    "These are quoted separately unless explicitly included in your " +
                    "confirmed package. Tell us what support you need."
                ],
                [
                    "How early should I enquire?",
                    "Contact us as soon as you have a date and estimated guest count. " +
                    "We will confirm preparation time and availability."
                ]
            ]
        },

        "celebration-cakes": {
            title: "Celebration Cakes",
            badge: "Made for your moment",
            headline: "Make the moment unforgettable.",
            description:
                "Dreamy layers, thoughtful finishes and flavours chosen around " +
                "you. A centrepiece for birthdays, milestones and just-because moments.",
            image: photo("photo-1578985545062-69928b1d9587"),
            storyImage:"cake imgser.webp",
            storyTitle: "More than a cake.<br><em>A moment to remember.</em>",
            story:
                "From a simple birthday message to a thoughtfully styled " +
                "centrepiece, your cake should feel personal. We help you choose " +
                "the flavours, size and finishing details.",
            includes: [
                "Cake and filling flavour consultation",
                "Personalised message and colour palette",
                "Size and decoration planning"
            ],
            benefits: [
                {
                    title: "Personal touches",
                    text: "Messages, colours and finishes help reflect the person you are celebrating."
                },
                {
                    title: "Balanced flavours",
                    text: "Thoughtful cake and filling combinations make every slice enjoyable."
                },
                {
                    title: "A lovely centrepiece",
                    text: "Presentation is planned around the style and size of your occasion."
                }
            ],
            unit: "cake",
            prices: ["₹900", "₹1,600", "₹2,800"],
            packages: [
                {
                    name: "Classic Celebration",
                    description: "A beautiful cake for a thoughtful little occasion.",
                    items: ["Classic cake flavour", "Personalised message", "Simple finishing"]
                },
                {
                    name: "Signature Layers",
                    description: "A more expressive cake with extra detail.",
                    items: ["Cake and filling choices", "Selected colour palette", "Signature decoration"]
                },
                {
                    name: "Bespoke Moment",
                    description: "A personalised centrepiece for your celebration.",
                    items: ["Design consultation", "Custom finishing discussion", "Size planning for your guests"]
                }
            ],
            faqs: [
                [
                    "Can I request a custom cake design?",
                    "Yes. Share your inspiration, preferred colours, serving count " +
                    "and date. We will confirm which details are possible."
                ],
                [
                    "How do I choose the correct cake size?",
                    "Tell us your expected guest count and whether other desserts " +
                    "will be served. Our team can suggest a suitable size."
                ],
                [
                    "Can you write a message on the cake?",
                    "Yes. Provide the exact message when enquiring. Space depends " +
                    "on the cake size and selected decoration."
                ],
                [
                    "How should I store the cake?",
                    "Storage instructions depend on your cake and filling. " +
                    "We will provide suitable guidance with your confirmed order."
                ]
            ]
        },

        "milkshake-studio": {
            title: "Milkshake Studio",
            badge: "Blended to delight",
            headline: "Sip something extraordinary.",
            description:
                "Thick, freshly blended milkshakes with our ice cream at their " +
                "heart. From chocolate comforts to bright fruit favourites.",
            image: photo("photo-1572490122747-3968b75cc699"),
            storyImage: photo("photo-1541658016709-82535e94bc69"),
            storyTitle: "A creamy blend.<br><em>A delicious escape.</em>",
            story:
                "Take a moment for something wonderfully indulgent. We blend " +
                "your chosen flavour fresh and finish it with the little " +
                "details that make every sip special.",
            includes: [
                "Classic and signature flavour blends",
                "Optional cream and topping choices",
                "Fresh preparation when ordered"
            ],
            benefits: [
                {
                    title: "Ice cream at heart",
                    text: "Our ice cream forms the creamy foundation of every signature blend."
                },
                {
                    title: "Freshly blended",
                    text: "Prepared when ordered for a satisfying texture and finish."
                },
                {
                    title: "Your finishing touch",
                    text: "Select a topping combination that matches your favourite flavours."
                }
            ],
            unit: "shake",
            prices: ["₹180", "₹260", "₹380"],
            packages: [
                {
                    name: "Classic Blend",
                    description: "A comforting favourite, freshly blended.",
                    items: ["Classic flavour", "Regular serving", "Fresh preparation"]
                },
                {
                    name: "Signature Shake",
                    description: "A richer blend with a little extra indulgence.",
                    items: ["Signature flavour", "Cream finish", "Selected topping"]
                },
                {
                    name: "Celebration Shake",
                    description: "An occasion-worthy treat in a glass.",
                    items: ["Premium flavour combination", "Decorative finish", "Extra topping selection"]
                }
            ],
            faqs: [
                [
                    "Are milkshakes made fresh?",
                    "Yes. Milkshakes are blended when ordered using the ingredients " +
                    "and flavours in your selected option."
                ],
                [
                    "Can I remove whipped cream or toppings?",
                    "Yes. Tell us your preferences before preparation and we will " +
                    "confirm the available adjustments."
                ],
                [
                    "Are dairy-free shakes available?",
                    "Ask about suitable ingredients available that day. We cannot " +
                    "guarantee an allergen-free preparation environment."
                ],
                [
                    "Can I order several milkshakes for a group?",
                    "Yes. Share your quantities and preferred collection time " +
                    "so we can confirm preparation arrangements."
                ]
            ]
        },

        "party-desserts": {
            title: "Party Dessert Boxes",
            badge: "Sweetness to share",
            headline: "Little treats. Big smiles.",
            description:
                "Beautifully arranged dessert boxes for birthdays, gifting and " +
                "team treats. Choose an assortment and make someone’s day.",
            image: photo("photo-1551024506-0bccd828d307"),
            storyImage: photo("photo-1488477181946-6428a0291777"),
            storyTitle: "Open a box.<br><em>Share a little joy.</em>",
            story:
                "A thoughtful assortment makes sharing feel special. From " +
                "small gifts to party tables, we help choose a mix of treats " +
                "and presentation details for your occasion.",
            includes: [
                "Curated miniature dessert assortments",
                "Gift message and presentation options",
                "Quantity planning for your occasion"
            ],
            benefits: [
                {
                    title: "Easy to share",
                    text: "Individual treats make serving simple at gatherings and team celebrations."
                },
                {
                    title: "Gift-ready style",
                    text: "Thoughtful presentation turns a dessert assortment into a lovely gift."
                },
                {
                    title: "A little variety",
                    text: "An assortment lets everyone discover a favourite sweet moment."
                }
            ],
            unit: "box",
            prices: ["₹480", "₹850", "₹1,400"],
            packages: [
                {
                    name: "Little Joy Box",
                    description: "A thoughtful selection for a small sweet gesture.",
                    items: ["Mini dessert assortment", "Standard presentation", "Optional gift message"]
                },
                {
                    name: "Signature Sharing Box",
                    description: "A generous variety for favourite people.",
                    items: ["Expanded assortment", "Sharing selection", "Gift message"]
                },
                {
                    name: "Celebration Box",
                    description: "A larger selection made for a special gathering.",
                    items: ["Celebration assortment", "Presentation consultation", "Quantity planning"]
                }
            ],
            faqs: [
                [
                    "What desserts come in a box?",
                    "The assortment depends on your selected package and availability. " +
                    "The exact contents and quantities are confirmed before ordering."
                ],
                [
                    "Can I add a personal message?",
                    "Yes. Share your message when enquiring so we can discuss " +
                    "the suitable presentation option."
                ],
                [
                    "Can I order boxes for a team or party?",
                    "Yes. Tell us your required quantity and date. We will confirm " +
                    "lead time, assortment and any custom presentation options."
                ],
                [
                    "How should I store the desserts?",
                    "Storage and serving instructions depend on the selected treats " +
                    "and will be provided with your order."
                ]
            ]
        }
    };

    const target = document.getElementById("serviceContent");
    const selectedId = new URLSearchParams(location.search).get("service");
    const service = services[selectedId];

    const escapeHTML = (value) =>
        String(value).replace(/[&<>"']/g, (character) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);

    if (!service) {
        target.innerHTML = `
      <section class="section container">
        <p class="eyebrow">Find your sweet moment</p>
        <h1>Choose your service.</h1>
        <p>
          Select a service to explore its experience, options and pricing.
        </p>
        <a class="button button-primary" href="services.html">
          Explore All Services ↗
        </a>
      </section>
    `;
    } else {
        document.title = `${service.title} | Swirlberry`;

        const description = document.querySelector(
            'meta[name="description"]'
        );

        description.content = service.description;

        const enquiryURL = (packageName = "") => {
            const parameters = new URLSearchParams({
                service: selectedId
            });

            if (packageName) parameters.set("package", packageName);

            return `contact.html?${parameters}`;
        };

        target.innerHTML = `
      <section class="detail-hero">
        <div class="container detail-hero-grid">
          <div>
            <p class="eyebrow">${escapeHTML(service.badge)}</p>
            <h1>${escapeHTML(service.title)}</h1>
            <p class="hero-subtitle">${escapeHTML(service.headline)}</p>
            <p class="hero-description">
              ${escapeHTML(service.description)}
            </p>

            <div class="button-row">
              <a class="button button-primary"
                 href="${escapeHTML(enquiryURL())}">
                Enquire About This Service ↗
              </a>

              <a class="button button-outline" href="#pricing">
                Explore Pricing
              </a>
            </div>
          </div>

          <div class="detail-visual">
            <img
              src="${service.image}"
              alt="${escapeHTML(service.title)}"
              width="900"
              height="1000"
              fetchpriority="high">

          </div>
        </div>
      </section>

      <section class="section container story-grid">
        <div class="story-image">
          <img
            class="${selectedId === "artisan-scoops" ? "artisan-experience-image" : ""}"
            src="${service.storyImage}"
            alt="${escapeHTML(service.title)} presentation"
            width="900"
            height="1000"
            loading="lazy">
        </div>

        <div class="story-copy">
          <p class="eyebrow">
            The ${escapeHTML(service.title)} experience
          </p>

          <h2>${service.storyTitle}</h2>
          <p>${escapeHTML(service.story)}</p>

          <ul class="included">
            ${service.includes.map((item) => `
              <li>${escapeHTML(item)}</li>
            `).join("")}
          </ul>
        </div>
      </section>

      <section class="section benefits-section">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Why choose this service</p>
            <h2>Thoughtful touches.<br><em>Delicious differences.</em></h2>
            <p>
              The little details that make
              ${escapeHTML(service.title.toLowerCase())} feel special.
            </p>
          </div>

          <div class="benefit-grid">
            ${service.benefits.map((benefit) => `
              <article class="benefit">
                <span class="benefit-symbol" aria-hidden="true">✦</span>
                <h3>${escapeHTML(benefit.title)}</h3>
                <p>${escapeHTML(benefit.text)}</p>
              </article>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="section container" id="pricing">
        <div class="section-heading">
          <p class="eyebrow">A sweet place to start</p>
          <h2>Your occasion.<br><em>Your perfect option.</em></h2>
          <p>
            Explore an option for your
            ${escapeHTML(service.title.toLowerCase())} experience.
          </p>
        </div>

        <div class="price-grid">
          ${service.packages.map((option, index) => `
            <article class="price-card ${index === 1 ? "featured" : ""}">
              <span class="badge">
                ${index === 0
                ? "Simple pleasures"
                : index === 1
                    ? "Signature indulgence"
                    : "Made to celebrate"}
              </span>

              <h3>${escapeHTML(option.name)}</h3>
              <p>${escapeHTML(option.description)}</p>

              <div class="price">
                ${service.prices[index]}
                <small>
                  Starting estimate / ${escapeHTML(service.unit)}
                </small>
              </div>

              <ul class="included">
                ${option.items.map((item) => `
                  <li>${escapeHTML(item)}</li>
                `).join("")}
              </ul>

              <a class="button ${index === 1 ? "button-primary" : "button-outline"
            }" href="${escapeHTML(enquiryURL(option.name))}">
                Enquire About This Option ↗
              </a>
            </article>
          `).join("")}
        </div>

        <p class="pricing-note">
          Illustrative starting prices. Exact quantities, portion sizes,
          customisation, taxes, delivery and any staffing charges are
          confirmed in your quote before ordering.
        </p>
      </section>

      <section class="section container faq-layout">
        <div class="faq-copy">
          <p class="eyebrow">Before your first bite</p>
          <h2>Your questions.<br><em>Sweetly answered.</em></h2>
          <p>
            Helpful details about
            ${escapeHTML(service.title.toLowerCase())}.
          </p>
          <a class="text-link"
             href="${escapeHTML(enquiryURL())}">
            Have Another Question? ↗
          </a>
        </div>

        <div>
          ${service.faqs.map(([question, answer]) => `
            <details class="faq-item">
              <summary>${escapeHTML(question)}</summary>
              <p>${escapeHTML(answer)}</p>
            </details>
          `).join("")}
        </div>
      </section>

      <section class="section container">
        <div class="cta-card">
          <div>
            <p class="eyebrow">Let’s make it yours</p>
            <h2>
              Ready for a little<br>
              <em>${escapeHTML(service.title.toLowerCase())}?</em>
            </h2>
            <p>
              Share your preferences and let us plan the sweet details together.
            </p>
          </div>

          <a class="button button-primary"
             href="${escapeHTML(enquiryURL())}">
            Plan My Sweet Moment ↗
          </a>
        </div>
      </section>
    `;
    }

    /* Independent header functionality */

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

    /* Image fallback */

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