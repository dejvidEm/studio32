import { STUDIO_CONTACT_MANAGER_PROFILE } from "@/lib/contact-manager";
import { NextResponse } from "next/server";

function getAvatarList() {
  return [
    { image: "https://placehold.co/400x400", title: "Sarah Johnson" },
    { image: "https://placehold.co/400x400", title: "Olivia Miller" },
    { image: "https://placehold.co/400x400", title: "Sophia Roberts" },
    { image: "https://placehold.co/400x400", title: "Isabella Clark" },
  ];
}

function getStatsFactData(lang: "en" | "sk") {
  const isSk = lang === "sk";
  return {
    number: "01",
    name: isSk ? "Štatistiky a fakty" : "Stats & facts",
    heading: isSk
      ? "Meníme chaos na značku s jasnou identitou"
      : "We turn chaos into a brand with a clear identity",
    description: isSk
      ? "Pri výbere agentúry je dôležité zvážiť jej povesť, skúsenosti a špecifické potreby vášho projektu."
      : "When selecting an agency, it's essential to consider its reputation, experience, and the specific needs of your project.",
    scoreData: [
      {
        number: 100,
        scoreDescp: isSk ? "Ľudí, ktorí s nami spolupracovali" : "People who have worked with us",
      },
      {
        number: 10,
        scoreDescp: isSk ? "Skúsených profesionálov v tíme" : "Experienced professionals on the team",
      },
      {
        displayAs: "24/7",
        showPlus: false,
        scoreDescp: isSk ? "Podpora pre vaše projekty" : "Support for your projects",
      },
    ],
  };
}

const brandingDescpSk =
  "Silná značka vzniká z každého detailu, ktorý zákazník pri kontakte s firmou zažije. Nejde len o logo či webstránku, ale o celkový pocit, dôveru a zapamätateľnosť. Každý rok pribúdajú stovky tisíc nových ochranných známok, a práve preto je odlíšenie kľúčové. Dobre vybudovaný branding pomáha priťahovať nových zákazníkov, posilňuje hodnotu produktov a služieb a prirodzene podporuje rast ziskov.";
const brandingDescpEn =
  "Branding isn't just a logo or a website. It's the overall impression customers take away from every interaction with your business. Every year, hundreds of thousands of new trademarks are filed—which is why a strong brand is essential to standing out. It builds trust, attracts new customers, and increases the value of your products and services, which naturally translates into higher profits.";

const webDescpSk =
  "Moderná webstránka je viac než len online vizitka. Predstavuje centrum vašej značky, miesto prvého dojmu aj nástroj na získavanie zákazníkov. V dnešnom digitálnom prostredí uspejú iba stránky, ktoré sú vizuálne atraktívne, rýchle a funkčné. Premyslený web dokáže odlíšiť firmu od konkurencie, zvýšiť dôveryhodnosť a priniesť viac konverzií aj obchodných príležitostí.";
const webDescpEn =
  "A website isn't just an online business card—it's the hub of your brand. Among countless new sites, only the thoughtful and functional ones succeed. A quality website sets you apart from competitors, captures attention, and strengthens the value of your offering. A well-designed site is an investment that pays back through higher conversions and a stronger brand.";

const contentDescpSk =
  "Kvalitný obsah rozhoduje o tom, ako si zákazníci značku zapamätajú. Každý príspevok, text, vizuál či email formuje komunikáciu firmy a buduje jej identitu. V preplnenom online priestore pomáha konzistentný obsah zaujať správne publikum, posilniť dôveru a vytvoriť dlhodobý vzťah so zákazníkmi. Práve premyslená komunikácia často oddeľuje priemerné značky od tých úspešných.";
const contentDescpEn =
  "Content creation isn't just about posts or copy—it's how a brand communicates, builds trust, and stays memorable at every customer touchpoint. In a crowded digital space, consistent, quality content decides whether a brand fades away or stands out. Thoughtful communication on social media, in emails, blogs, and visuals strengthens brand identity, attracts the right audience, and naturally increases both perceived value and business results.";

const marketingDescpSk =
  "Za úspešnou značkou stojí stratégia, ktorá dokáže premeniť pozornosť na reálne výsledky. Marketing dnes nie je iba o reklamách, ale o správnom cielení, konzistentnej komunikácii a budovaní dlhodobého rastu. Efektívne kampane zvyšujú viditeľnosť firmy, oslovujú relevantné publikum a pomáhajú budovať silnú a dôveryhodnú značku, ktorá rastie spolu s tržbami.";
const marketingDescpEn =
  "Marketing isn't just ads or campaigns. It's a systematic way for your brand to grow, reach the right audience, and turn attention into real results. In a crowded digital environment, strategy, consistency, and precise targeting decide who wins the customer. Effective marketing raises visibility, builds trust, and supports long-term growth that translates directly into revenue and brand strength.";

function getServicesData(lang: "en" | "sk") {
  const isSk = lang === "sk";
  const brandingDescp = isSk ? brandingDescpSk : brandingDescpEn;
  const webDescp = isSk ? webDescpSk : webDescpEn;
  const contentDescp = isSk ? contentDescpSk : contentDescpEn;
  const marketingDescp = isSk ? marketingDescpSk : marketingDescpEn;
  return {
    number: "03",
    name: isSk ? "Služby" : "Services",
    heading: isSk ? "Čo robíme" : "What we do",
    description: isSk
      ? "Pohľad do našej tvorivosti—inovatívne dizajny, úspešné spolupráce a transformačné digitálne zážitky."
      : "A glimpse into our creativity—exploring innovative designs, successful collaborations, and transformative digital experiences.",
    data: [
      { id: 1, image: "https://placehold.co/400x250", heading: "Branding", descp: brandingDescp },
      { id: 2, image: "https://placehold.co/400x250", heading: isSk ? "Webstránky" : "Website", descp: webDescp },
      { id: 3, image: "https://placehold.co/400x250", heading: isSk ? "Tvorba obsahu" : "Content creation", descp: contentDescp },
      { id: 4, image: "https://placehold.co/400x250", heading: "Marketing", descp: marketingDescp },
    ],
  };
}

function getTestimonialData(lang: "en" | "sk") {
  const isSk = lang === "sk";
  return {
    data_1: {
      preTitle: isSk ? "Počúvajte ich" : "Hear from them",
      title: isSk ? "Redesign nášho webu bol bezchybný. Perfektne pochopili našu víziu!" : "Our website redesign was flawless. They understood our vision perfectly!",
      author: "Martin Kováč",
      company: isSk ? "Zakladateľ" : "Founder",
      avatar: "/images/testimonial/testimonial_1.png",
    },
    data_2: {
      preTitle: isSk ? "Počúvajte ich" : "Hear from them",
      title: isSk ? "Od konceptu po realizáciu dodali vynikajúce výsledky. Vrelo odporúčam!" : "From concept to execution, they delivered outstanding results. Highly recommend their expertise!",
      author: "Petra Malíková",
      company: "Marketing Manager",
      avatar: "/images/testimonial/testimonial_2.png",
    },
    data_3: {
      preTitle: isSk ? "Počúvajte ich" : "Hear from them",
      title: isSk ? "Veľmi plynulý proces s úžasnými výsledkami. Vrelo odporúčam!" : "Super smooth process with incredible results. highly recommend!",
      author: "Tomáš Hrušička",
      company: "CEO",
      avatar: "/images/testimonial/testimonial_3.png",
    },
  };
}

function getTeamData(lang: "en" | "sk") {
  const isSk = lang === "sk";
  return {
    number: "06",
    data: [
      {
        image: "/images/team/david-mikulas.png",
        name: "Dávid Mikuláš",
        roleTags: isSk ? ["Vedenie", "Creative Director"] : ["Leadership", "Creative Director"],
      },
    ],
  };
}

function getPricingData(lang: "en" | "sk") {
  const isSk = lang === "sk";
  return {
    data: [
      {
        planName: "Launch",
        planPrice: "699 €",
        planDescp: isSk ? "Ideálne pre startupy a malé firmy robiace prvé kroky online." : "Ideal for startups and small businesses taking their first steps online.",
        planIncludes: isSk
          ? ["Konkurenčný prieskum a analýzy", "Wireframy a prototypy", "Základné sledovanie (Google Analytics atď.)", "Štandardný kontaktný formulár"]
          : ["Competitive research & insights", "Wireframing and prototyping", "Basic tracking setup (Google Analytics, etc.)", "Standard contact form integration"],
      },
      {
        planName: "Scale",
        tag: isSk ? "Najobľúbenejšie" : "Most popular",
        planPrice: "1 699 €",
        cancelPrice: "2 199 €",
        planDescp: isSk ? "Pre rastúce značky potrebujúce viac prispôsobenia a flexibility." : "Perfect for growing brands needing more customization and flexibility.",
        planIncludes: isSk
          ? ["Všetko z plánu Launch", "Vlastný dizajn až 10 stránok", "Integrácia sociálnych médií", "SEO vylepšenia kľúčových stránok"]
          : ["Everything in the Launch Plan", "Custom design for up to 10 pages", "Seamless social media integration", "SEO enhancements for key pages"],
      },
      {
        planName: "Elevate",
        planPrice: "3 499 €",
        planDescp: isSk ? "Pre zavedené firmy chcúce plne na mieru riešenie." : "Best suited for established businesses wanting a fully tailored experience.",
        planIncludes: isSk
          ? ["Všetko z plánu Scale", "E-commerce funkcie (ak treba)", "Dizajn e-mailových šablón", "Prioritná podpora 6 mesiacov po spustení"]
          : ["Everything in the Scale Plan", "E-commerce functionality (if needed)", "Branded email template design", "Priority support for six months after launch"],
      },
    ],
    partnerLogo: [
      { light: "https://placehold.co/150x60", dark: "https://placehold.co/150x60" },
      { light: "https://placehold.co/150x60", dark: "https://placehold.co/150x60" },
      { light: "https://placehold.co/150x60", dark: "https://placehold.co/150x60" },
      { light: "https://placehold.co/150x60", dark: "https://placehold.co/150x60" },
      { light: "https://placehold.co/150x60", dark: "https://placehold.co/150x60" },
    ],
  };
}

function getFaqData(lang: "en" | "sk") {
  const isSk = lang === "sk";
  return {
    data: [
      {
        faq_que: isSk ? "Aké služby vaša agentúra ponúka?" : "What services does your agency offer?",
        faq_ans: isSk
          ? "Branding, webstránky, tvorba obsahu a marketing. Každý projekt riešime na mieru — podľa cieľov, nie podľa šablóny."
          : "Branding, websites, content creation, and marketing. Every project is tailored to your goals, not a one-size-fits-all package.",
      },
      {
        faq_que: isSk ? "Ako dlho zvyčajne trvá projekt?" : "How long does a typical project take?",
        faq_ans: isSk
          ? "Každý projekt je individuálny — závisí od rozsahu, spätnej väzby a toho, čo presne potrebujete. Termín vždy dohodneme vopred v ponuke. Pracujeme efektívne a v čo najkratšom čase, ale nikdy na úkor kvality."
          : "Every project is different — it depends on scope, feedback, and what you need. We always agree on a timeline upfront in the proposal. We work efficiently and as quickly as we can, but never at the expense of quality.",
      },
      {
        faq_que: isSk ? "Ponúkate vlastné dizajny?" : "Do you offer custom designs?",
        faq_ans: isSk
          ? "Áno. Dizajn vytvárame od nuly podľa vašej značky, cieľovej skupiny a toho, čo má web alebo vizuál riešiť."
          : "Yes. We design from scratch around your brand, audience, and what the site or visuals need to achieve.",
      },
      {
        faq_que: isSk ? "Aká je cena projektu?" : "What's the cost of a project?",
        faq_ans: isSk
          ? "Závisí od rozsahu a zadania. Orientačne web od 699 €, rozsiahlejšie projekty po dohode. Po krátkom brífingu pripravíme konkrétnu ponuku."
          : "It depends on scope and requirements. Websites start from around €699; larger projects are quoted individually. After a short brief, we send a clear proposal.",
      },
      {
        faq_que: isSk ? "Poskytujete podporu po dokončení projektu?" : "Do you provide ongoing support after project completion?",
        faq_ans: isSk
          ? "Áno. Po odovzdaní ponúkame údržbu, drobné úpravy a technickú podporu — podľa dohodnutého balíčka alebo ad hoc."
          : "Yes. After launch we offer maintenance, small updates, and technical support — on a retainer or as needed.",
      },
    ],
  };
}

function getContactData(lang: "en" | "sk") {
  const isSk = lang === "sk";
  return {
    keypoint: isSk ? ["Neustála zákaznícka podpora", "Služby po celom svete"] : ["Always-On Customer Support", "Service Across the Globe"],
    managerProfile: { ...STUDIO_CONTACT_MANAGER_PROFILE },
  };
}

function getAboutusStats(lang: "en" | "sk") {
  const isSk = lang === "sk";
  return [
    { number: 45, postfix: "+", title: isSk ? "Prítomnosť na globálnych trhoch" : "Presence in global markets", descp: isSk ? "Rozširujeme dosah s lokalizovanou expertízou a celosvetovým dopadom." : "Expanding reach across international regions with localized expertise and worldwide impact." },
    { number: 30, postfix: "+", title: isSk ? "Dokončených projektov" : "Projects delivered", descp: isSk ? "Branding, web aj obsah — každý projekt riešime na mieru, s dôrazom na detail a funkčnosť." : "Branding, web, and content — every project tailored with attention to detail and usability." },
    { number: 158, postfix: "+", title: isSk ? "Dôveryhodné spolupráce značiek" : "Trusted brand collaborations", descp: isSk ? "Formujeme priemyselné diskusie cez inovácie, tvorivosť a trvalý vplyv." : "Shaping industry conversations through innovation, creativity, and lasting influence." },
  ];
}

function getServicesSliderData(lang: "en" | "sk") {
  return lang === "sk"
    ? ["Branding", "Webstránky", "Agentúra", "Tvorba obsahu", "SaaS", "Marketing", "Fotografia"]
    : ["Branding", "Website", "Agency", "Content creation", "SaaS", "Marketing", "Photography"];
}

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") === "en" ? "en" : "sk";

  return NextResponse.json({
    avatarList: getAvatarList(),
    statsFactData: getStatsFactData(lang),
    servicesData: getServicesData(lang),
    testimonialData: getTestimonialData(lang),
    teamData: getTeamData(lang),
    pricingData: getPricingData(lang),
    faqData: getFaqData(lang),
    contactData: getContactData(lang),
    aboutusStats: getAboutusStats(lang),
    servicesSliderData: getServicesSliderData(lang),
  });
};
