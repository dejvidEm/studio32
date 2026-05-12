import { NextResponse } from "next/server";

/** Dočasne skryté — na obnovenie položky Blog v burger menu nastav na `true`. Záznamy v poliach nižšie ostanú nezmenené. */
const SHOW_BLOG_IN_SITE_MENU = false;

const MenuDataEn = [
  { id: 1, title: "Home", path: "/", newTab: false },
  { id: 2, title: "About", path: "/about", newTab: false },
  { id: 5, title: "Services", path: "/#services", newTab: false },
  { id: 3, title: "Projects", path: "/projects", newTab: false },
  { id: 4, title: "Blog", path: "/blog", newTab: false },
  { id: 6, title: "Contact", path: "/contact", newTab: false },
];

const MenuDataSk = [
  { id: 1, title: "Domov", path: "/", newTab: false },
  { id: 2, title: "O nás", path: "/about", newTab: false },
  { id: 5, title: "Služby", path: "/#services", newTab: false },
  { id: 3, title: "Projekty", path: "/projects", newTab: false },
  { id: 4, title: "Blog", path: "/blog", newTab: false },
  { id: 6, title: "Kontakt", path: "/contact", newTab: false },
];

const footerDataEn = {
  name: "Studio32",
  tagline: "Let's talk",
  info: [
    { icon: "/images/footer/email-arrow.svg", link: "hello@studio32.sk", href: "mailto:hello@studio32.sk" },
    { icon: "/images/footer/Location.svg", link: "Bratislava, Slovakia", href: "https://www.google.com/maps/search/?api=1&query=Bratislava%2C+Slovakia" },
  ],
  links: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/#services" },
    { name: "Work", href: "/projects" },
    { name: "Terms", href: "/terms-and-conditions" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Error 404", href: "/not-found" },
  ],
  socialLinks: [
    { name: "Facebook", href: "https://www.facebook.com/" },
    { name: "Instagram", href: "https://www.instagram.com/" },
    { name: "Twitter", href: "https://x.com/" },
  ],
  copyright: "© Studio32 copyright 2026",
};

const footerDataSk = {
  name: "Studio32",
  tagline: "Poďme sa porozprávať",
  info: [
    { icon: "/images/footer/email-arrow.svg", link: "hello@studio32.sk", href: "mailto:hello@studio32.sk" },
    { icon: "/images/footer/Location.svg", link: "Bratislava, Slovensko", href: "https://www.google.com/maps/search/?api=1&query=Bratislava%2C+Slovakia" },
  ],
  links: [
    { name: "Domov", href: "/" },
    { name: "O nás", href: "/about" },
    { name: "Služby", href: "/#services" },
    { name: "Práca", href: "/projects" },
    { name: "Obchodné podmienky", href: "/terms-and-conditions" },
    { name: "Ochrana súkromia", href: "/privacy-policy" },
    { name: "Chyba 404", href: "/not-found" },
  ],
  socialLinks: [
    { name: "Facebook", href: "https://www.facebook.com/" },
    { name: "Instagram", href: "https://www.instagram.com/" },
    { name: "Twitter", href: "https://x.com/" },
  ],
  copyright: "© Studio32 autorské práva 2026",
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") === "en" ? "en" : "sk";
  const MenuDataRaw = lang === "en" ? MenuDataEn : MenuDataSk;
  const MenuData =
    SHOW_BLOG_IN_SITE_MENU ? MenuDataRaw : MenuDataRaw.filter((item) => item.path !== "/blog");
  const footerData = lang === "en" ? footerDataEn : footerDataSk;
  return NextResponse.json({ footerData, MenuData });
};
