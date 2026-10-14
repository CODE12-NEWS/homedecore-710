const styleOptions = {
  scandi: {
    name: "Scandinavian",
    kicker: "LIGHT · CALM · FUNCTIONAL",
    image: "assest/decor/living-scandi.jpg",
    alt: "Scandinavian living room with blue sofa, white storage and herringbone wood floor",
    desc: "Born from long Nordic winters, Scandinavian design is all about light. Expect pale woods, soft whites and clean silhouettes, warmed up by cozy textiles and a single confident accent color. Every object earns its place by being both useful and beautiful.",
    palette: ["#f4f1ea", "#d9d4c7", "#c4a27a", "#2f4f7f", "#2a2a28"],
    materials: "Oak & ash wood · Wool · Linen · Matte white lacquer",
    best: "Small apartments, north-facing rooms, families who love order",
  },
  boho: {
    name: "Bohemian",
    kicker: "LAYERED · CRAFTED · FREE-SPIRITED",
    image: "assest/decor/living-rattan.jpg",
    alt: "Bohemian living room with rattan pendant lights, patterned rug and plants",
    desc: "Bohemian interiors tell the story of a well-travelled life. Woven rattan, patterned rugs, handmade ceramics and an abundance of plants come together in a relaxed, collected look that feels personal, warm and endlessly inviting.",
    palette: ["#ece3d2", "#c79a5b", "#b5643f", "#6f7a55", "#3a3530"],
    materials: "Rattan · Jute · Macramé · Terracotta · Vintage textiles",
    best: "Creative souls, sunny rooms, anyone who loves plants",
  },
  organic: {
    name: "Organic Modern",
    kicker: "NATURAL · GROUNDED · SERENE",
    image: "assest/decor/living-wide.jpg",
    alt: "Organic modern living room with grey sofa, leather ottomans and large windows to nature",
    desc: "Organic Modern blends clean contemporary lines with the raw beauty of nature. Earthy neutrals, solid wood, leather and stone create a calm, grounded space that opens itself up to daylight and greenery outside.",
    palette: ["#e8e1d5", "#b9ab97", "#8d6a4b", "#5b6650", "#2e2c29"],
    materials: "Solid walnut · Cognac leather · Stone · Bouclé",
    best: "Open-plan spaces, homes with big windows, lovers of calm",
  },
  minimal: {
    name: "Minimalist",
    kicker: "QUIET · EDITED · INTENTIONAL",
    image: "assest/decor/accent-chair.jpg",
    alt: "Minimalist living room with a yellow accent chair, brass floor lamp and framed art",
    desc: "Minimalism is the art of less, done beautifully. A restrained palette, generous negative space and a few sculptural pieces let architecture and light take the lead — with one bold accent to give the room its personality.",
    palette: ["#f2f0ec", "#d8d5cf", "#a69d90", "#e0b23a", "#1f1f1e"],
    materials: "Light oak · Brushed brass · Matte plaster · Wool felt",
    best: "Busy minds, compact rooms, those who want less clutter",
  },
  warm: {
    name: "Warm Contemporary",
    kicker: "INVITING · BRIGHT · SOPHISTICATED",
    image: "assest/decor/living-sunlit.jpg",
    alt: "Warm contemporary living room with leather sofa, white lounge chairs and gallery wall",
    desc: "Warm Contemporary pairs modern comfort with tactile, sun-kissed materials. Soft cream walls, a rich leather sofa, curated black-and-white art and lush plants create a space that feels polished yet effortlessly lived-in.",
    palette: ["#efe6d8", "#c9a27e", "#8a5a3b", "#4d5a45", "#2b2a27"],
    materials: "Leather · Light oak · Woven wool · Black metal accents",
    best: "Bright apartments, entertaining, a refined everyday feel",
  },
  future: {
    name: "Futuristic",
    kicker: "BOLD · SMART · IMAGINATIVE",
    image: "assest/image_1.png",
    alt: "Futuristic living space with flowing curves, glowing lights and city views",
    desc: "Let your imagination run free. Futuristic concepts explore flowing curves, ambient LED lighting, integrated smart technology and dramatic views — a playful way to dream about how we might live tomorrow.",
    palette: ["#f1ede4", "#d8b98a", "#7fb4d8", "#3a4a63", "#14161c"],
    materials: "Glossy composites · Glass · Brushed steel · Ambient LED",
    best: "Dreamers, tech lovers and bold creative experiments",
  },
};

// Show a soft placeholder instead of a broken image icon if a file ever fails to load.
document.querySelectorAll(".frame img, .phone-img img").forEach((img) => {
  const markFailed = () => img.closest(".frame, .phone-img")?.classList.add("img-failed");
  if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) markFailed();
  img.addEventListener("error", markFailed);
  img.addEventListener("load", () => img.closest(".frame, .phone-img")?.classList.remove("img-failed"));
});

document.querySelector(".cta-bg")?.addEventListener("error", (event) => {
  event.target.remove();
});

// Style explorer
const styleTabs = [...document.querySelectorAll(".style-tab")];
const styleImage = document.querySelector("#style-image");
const styleName = document.querySelector("#style-name");
const styleKicker = document.querySelector("#style-kicker");
const styleDesc = document.querySelector("#style-desc");
const stylePalette = document.querySelector("#style-palette");
const styleMaterials = document.querySelector("#style-materials");
const styleBest = document.querySelector("#style-best");

// Preload style images so switching tabs is instant.
Object.values(styleOptions).forEach(({ image }) => {
  const preload = new Image();
  preload.src = image;
});

function selectStyle(key) {
  const style = styleOptions[key];
  if (!style) return;

  styleTabs.forEach((tab) => {
    const isActive = tab.dataset.style === key;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  styleImage.classList.add("is-fading");
  window.setTimeout(() => {
    styleImage.src = style.image;
    styleImage.alt = style.alt;
    styleImage.classList.remove("is-fading");
  }, 220);

  styleName.textContent = style.name;
  styleKicker.textContent = style.kicker;
  styleDesc.textContent = style.desc;
  styleMaterials.textContent = style.materials;
  styleBest.textContent = style.best;
  stylePalette.replaceChildren(
    ...style.palette.map((color) => {
      const swatch = document.createElement("i");
      swatch.style.setProperty("--c", color);
      return swatch;
    })
  );
}

styleTabs.forEach((tab) => {
  tab.addEventListener("click", () => selectStyle(tab.dataset.style));
});

// Mobile menu
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

function setMenu(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  mainNav.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

// Header shadow on scroll
const header = document.querySelector(".site-header");
const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// Reveal sections on scroll
if ("IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll(
    ".section-head, .intro-grid, .intro-showcase, .feature-card, .how-grid, .style-explorer, .room-card, .audience-grid article, .faq-grid, .cta-inner"
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}
