import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

import { footerForAck } from "./footer-for-ack";

/** Hosted mark (PNG) — Gmail-friendly; asset in /public/images/logo/studio32-mark.png */
export const CONTACT_ACK_MARK_PATH = "/images/logo/studio32-mark.png";

/**
 * React Email `dev` sets REACT_EMAIL_INTERNAL_* — use copies in `src/emails/static/`
 * with `/static/...` so the preview iframe loads them. Real sends use absolute URLs from `/api/contact`.
 */
const IS_REACT_EMAIL_PREVIEW =
  typeof process.env.REACT_EMAIL_INTERNAL_USER_PROJECT_LOCATION !== "undefined";

const STATIC_MARK_FILE = "studio32-mark.png";
const STATIC_AVATAR_FILE = "david-mikulas-avatar.png";

const PREVIEW_DEFAULT_SITE = "https://studio32.sk";

function defaultLogoSrcForEnvironment(): string {
  return IS_REACT_EMAIL_PREVIEW
    ? `/static/${STATIC_MARK_FILE}`
    : `${PREVIEW_DEFAULT_SITE}${CONTACT_ACK_MARK_PATH}`;
}

function defaultAvatarSrcForEnvironment(): string {
  return IS_REACT_EMAIL_PREVIEW
    ? `/static/${STATIC_AVATAR_FILE}`
    : `${PREVIEW_DEFAULT_SITE}/images/contact/david-mikulas-avatar.png`;
}

const copy = {
  sk: {
    preview:
      "Ďakujeme za kontaktovanie štúdia Studio32 — Vaša správa bola doručená.",
    greetingHeadNoName: "Ďakujeme za váš záujem.",
    greetingHeadNamed: (name: string) => `Ďakujeme, ${name}.`,
    intro:
      "Radi sme dostali váš odkaz zo stránky. Ďakujeme za dôveru. Na vašu správu sa pozrieme čo najskôr osobne a odpovieme tak rýchlo, ako to okolnosti dopustia — väčšinou počas najbližších hodín.",
    followup:
      "Ak sú pri vašom dopyte časovo citlivé súvislosti, môžete nás bez ostychu kontaktovať aj nižšie uvedenými kontaktami.",
    contactLabel: "Váš kontakt v štúdiu",
    closing: "S pozdravom,",
    messageSummaryLabel: "Zobraziť znovu Vašu správu",
    messageEmpty: "(bez textovej správy)",
  },
  en: {
    preview:
      "Thank you for contacting Studio32 — your message was delivered successfully.",
    greetingHeadNoName: "Thank you for reaching out.",
    greetingHeadNamed: (name: string) => `Thank you, ${name}.`,
    intro:
      "We've received your message from our website and your inquiry is important to us. A member of the team will review it and respond personally as soon as we can — typically within one business day.",
    followup:
      "Should your topic be time‑sensitive, please feel welcome to reach us directly using the contact details below.",
    contactLabel: "Reach us:",
    closing: "Kind regards,",
    messageSummaryLabel: "Expand to read your message again",
    messageEmpty: "(no message provided)",
  },
};

/** Props are optional so `react-email dev` can mount the template without supplying data. */
export type ContactAcknowledgementEmailProps = {
  locale?: "sk" | "en";
  greetingFirstName?: string;
  message?: string;
  siteOrigin?: string;
  logoMainSrc?: string;
  logoFooterSrc?: string;
  avatarSrc?: string;
  managerName?: string;
  managerPosition?: string;
  managerPhone?: string;
  managerMailboxDisplay?: string;
};

export default function ContactAcknowledgementEmail({
  locale = "sk",
  greetingFirstName = "",
  message = "",
  siteOrigin = PREVIEW_DEFAULT_SITE,
  logoMainSrc = defaultLogoSrcForEnvironment(),
  logoFooterSrc = defaultLogoSrcForEnvironment(),
  avatarSrc = defaultAvatarSrcForEnvironment(),
  managerName = "Dávid Mikuláš",
  managerPosition = "Creative Director",
  managerPhone = "+421 918 722 720",
  managerMailboxDisplay = "hello@studio32.sk",
}: ContactAcknowledgementEmailProps) {
  const lang: "sk" | "en" = locale === "en" ? "en" : "sk";
  const t = copy[lang];
  const footer = footerForAck(lang);
  const messageText = typeof message === "string" ? message : "";
  const hasMessage = messageText.trim().length > 0;
  const firstName = (typeof greetingFirstName === "string" ? greetingFirstName : "").trim();
  const headline =
    firstName.length > 0 ? t.greetingHeadNamed(firstName) : t.greetingHeadNoName;
  const phoneDisplay = typeof managerPhone === "string" ? managerPhone : "";
  const telHref = phoneDisplay.replace(/\s/gu, "");

  return (
    <Html lang={lang}>
      <Head />
      <Preview>{t.preview}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                studio: "#1f2a2e",
                muted: "#5c6670",
                line: "#e5e9e8",
                surface: "#f5f7f6",
              },
            },
          },
        }}
      >
        <Body className="bg-surface px-6 py-10 font-sans text-studio">
          <Container className="mx-auto mb-10 max-w-[560px] rounded-2xl border border-solid border-line bg-white px-10 py-11">
            <Section className="mb-9 text-center">
              <Link href={siteOrigin} className="inline-block">
                <Img
                  src={logoMainSrc}
                  alt="Studio32"
                  width={108}
                  height={108}
                  className="mx-auto h-auto w-[108px]"
                />
              </Link>
            </Section>

            <Heading className="m-0 mb-4 text-center text-[22px] font-semibold leading-tight tracking-tight text-studio">
              {headline}
            </Heading>

            <Text className="m-0 mb-5 text-[15px] leading-[1.6] text-muted">{t.intro}</Text>
            <Text className="m-0 mb-8 text-[15px] leading-[1.6] text-muted">{t.followup}</Text>

            <Section className="mb-8 overflow-hidden rounded-xl border border-solid border-line bg-[#fafcfb]">
              <details>
                <summary
                  className="cursor-pointer bg-white px-4 py-[14px] text-left text-[14px] font-semibold text-studio"
                  style={{ listStyle: "none", WebkitTapHighlightColor: "transparent" }}
                >
                  {t.messageSummaryLabel}
                </summary>
                <div className="border-t border-solid border-line px-4 py-4">
                  <Text className="m-0 whitespace-pre-wrap text-[14px] leading-[1.6] text-muted">
                    {hasMessage ? messageText : t.messageEmpty}
                  </Text>
                </div>
              </details>
            </Section>

            <Text className="m-0 mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
              {t.contactLabel}
            </Text>

            <Section className="mb-10 rounded-xl border border-solid border-line bg-[#fafcfb] px-5 py-5">
              <Row>
                <Column style={{ width: "84px", verticalAlign: "top" }}>
                  <Img
                    src={avatarSrc}
                    alt={managerName}
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] rounded-full object-cover"
                  />
                </Column>
                <Column className="pl-5" style={{ verticalAlign: "top" }}>
                  <Text className="m-0 text-[17px] font-semibold leading-tight text-studio">
                    {managerName}
                  </Text>
                  <Text className="m-0 mt-1 text-[14px] leading-snug text-muted">{managerPosition}</Text>
                  <Text className="m-0 mt-3">
                    <Link href={`mailto:${managerMailboxDisplay}`} className="text-[14px] font-semibold text-studio underline">
                      {managerMailboxDisplay}
                    </Link>
                  </Text>
                  <Text className="m-0 mt-1">
                    {telHref.length > 0 ? (
                      <Link href={`tel:${telHref}`} className="text-[14px] text-muted underline">
                        {phoneDisplay}
                      </Link>
                    ) : (
                      <span className="text-[14px] text-muted">{phoneDisplay}</span>
                    )}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Text className="m-0 mb-10 text-[15px] text-muted">{t.closing}</Text>

            <Hr className="m-0 mb-8 border-solid border-line" />
            <Section className="text-center">
              <Link href={siteOrigin} className="inline-block">
                <Img
                  src={logoFooterSrc}
                  alt="Studio32"
                  width={64}
                  height={64}
                  className="mx-auto h-auto w-[64px]"
                />
              </Link>
              <Text className="m-0 mt-5 text-center text-[13px] text-muted">{footer.copyright}</Text>
              <Text className="m-0 mt-1 mb-8 text-center text-[12px] text-muted">{footer.rightsReserved}</Text>
              <Text className="m-0 text-center leading-8">
                {footer.links.map((item, idx) => (
                  <span key={`${item.href}-${item.label}`}>
                    <Link href={item.href} className="text-[13px] font-semibold text-studio underline">
                      {item.label}
                    </Link>
                    {idx < footer.links.length - 1 ? <span className="text-muted"> · </span> : null}
                  </span>
                ))}
              </Text>
              <Text className="m-0 mt-10 text-center text-[12px] text-muted opacity-95">
                <Link href={siteOrigin} className="text-muted underline">
                  studio32.sk
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
