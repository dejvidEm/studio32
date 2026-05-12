import { NextResponse } from "next/server";
import { SHOW_HOME_BLOG_TEASER_AND_NAV } from "@/feature-flags";

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
  serviceCards: [
    { name: "Branding", href: "/#services" },
    { name: "Websites", href: "/#services" },
    { name: "Content creation", href: "/#services" },
    { name: "Marketing", href: "/#services" },
  ],
  columns: [
    {
      heading: "Links",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/#services" },
        { name: "Work", href: "/projects" },
      ],
    },
    {
      heading: "Documents",
      links: [
        { name: "General terms of business", href: "/terms-and-conditions" },
        { name: "General license terms", href: "/license-terms" },
        { name: "GDPR", href: "/privacy-policy" },
      ],
    },
    {
      heading: "Contact",
      links: [
        { name: "Contact", href: "/contact" },
        { name: "Support", href: "mailto:hello@studio32.sk?subject=Support" },
      ],
    },
  ],
  socialColumnHeading: "Social",
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
  serviceCards: [
    { name: "Branding", href: "/#services" },
    { name: "Webstránky", href: "/#services" },
    { name: "Tvorba obsahu", href: "/#services" },
    { name: "Marketing", href: "/#services" },
  ],
  columns: [
    {
      heading: "Linky",
      links: [
        { name: "Domov", href: "/" },
        { name: "O nás", href: "/about" },
        { name: "Služby", href: "/#services" },
        { name: "Práca", href: "/projects" },
      ],
    },
    {
      heading: "Dokumenty",
      links: [
        { name: "Všeob. obch. podmienky", href: "/terms-and-conditions" },
        { name: "Všeob. lic. podmienky", href: "/license-terms" },
        { name: "GDPR", href: "/privacy-policy" },
      ],
    },
    {
      heading: "Kontakt",
      links: [
        { name: "Kontakt", href: "/contact" },
        { name: "Podpora", href: "mailto:hello@studio32.sk?subject=Podpora" },
      ],
    },
  ],
  socialColumnHeading: "Sociálne siete",
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
  const menuSource = lang === "en" ? MenuDataEn : MenuDataSk;
  const MenuData = SHOW_HOME_BLOG_TEASER_AND_NAV
    ? menuSource
    : menuSource.filter((item) => item.path !== "/blog");
  const footerData = lang === "en" ? footerDataEn : footerDataSk;
  return NextResponse.json({ footerData, MenuData });
};
