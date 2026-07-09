/** Static page titles & descriptions (Slovak-first, used in metadata exports). */
import { DEFAULT_OG_IMAGE } from "@/lib/seo-text";

export const STATIC_PAGES = {
  home: {
    path: "/",
    title: "Digitálny dizajn, branding a weby",
    description:
      "Kreatívne štúdio Studio32 — branding, UI/UX a weby na mieru. Pozrite si portfólio, služby a kontaktujte nás pre nový projekt.",
    ogImage: DEFAULT_OG_IMAGE,
  },
  about: {
    path: "/about",
    title: "O nás",
    description:
      "Spoznajte tím Studio32 — proces, hodnoty a skúsenosti v digitálnom dizajne, brandingu a tvorbe webov pre ambiciózne značky.",
    ogImage: DEFAULT_OG_IMAGE,
  },
  contact: {
    path: "/contact",
    title: "Kontakt",
    description:
      "Napíšte alebo zavolajte štúdiu Studio32. Radi preberieme branding, web alebo redizajn — prvý kontakt bez záväzkov.",
    ogImage: DEFAULT_OG_IMAGE,
  },
  projects: {
    path: "/projects",
    title: "Projekty a portfólio",
    description:
      "Vybrané realizácie Studio32 — identity značiek, digitálne produkty a weby od konceptu po spustenie a merateľné výsledky.",
    ogImage: DEFAULT_OG_IMAGE,
  },
  blog: {
    path: "/blog",
    title: "Blog",
    description:
      "Články o digitálnom dizajne, brandingu, UX a weboch — praktické postrehy a novinky zo štúdia Studio32.",
    ogImage: DEFAULT_OG_IMAGE,
  },
  privacy: {
    path: "/privacy-policy",
    title: "Ochrana súkromia",
    description:
      "Zásady ochrany osobných údajov webu Studio32 — spracovanie údajov, cookies a práva používateľov podľa GDPR.",
    ogImage: DEFAULT_OG_IMAGE,
  },
  terms: {
    path: "/terms-and-conditions",
    title: "Obchodné podmienky",
    description:
      "Všeobecné obchodné podmienky spolupráce so štúdiom Studio32 pri dizajnových a webových službách.",
    ogImage: DEFAULT_OG_IMAGE,
  },
  license: {
    path: "/license-terms",
    title: "Licenčné podmienky",
    description:
      "Licenčné podmienky k dodaným dizajnom, šablónam a digitálnym materiálom od štúdia Studio32.",
    ogImage: DEFAULT_OG_IMAGE,
  },
} as const;

export const CONTACT_EMAIL = "hello@studio32.sk";
export const CONTACT_PHONE = "+421918722720";
