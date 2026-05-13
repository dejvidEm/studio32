import ContactAcknowledgementEmail, { CONTACT_ACK_MARK_PATH } from "@/emails/ContactAcknowledgementEmail";
import { STUDIO_CONTACT_MANAGER_PROFILE } from "@/lib/contact-manager";
import { absoluteUrl, getSiteUrl } from "@/lib/site";
import { NextRequest, NextResponse } from "next/server";
import { createElement } from "react";
import { render as renderAckEmail } from "@react-email/render";
import { Resend } from "resend";

/** Inbox where lead notifications arrive */
const CONTACT_INBOX = "hello@studio32.sk";

/** Verified Resend sending domain — override only via RESEND_FROM if needed */
const MAIL_FROM_DEFAULT = "Studio32 <noreply@updates.studio32.sk>";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Plain first name/word for greetings (no HTML). */
function greetingToken(name: string): string {
  const part = name.split(/\s+/)[0]?.trim();
  return part?.length ? part : name;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        error: "service_unavailable",
        ...(process.env.NODE_ENV === "development"
          ? {
              hint:
                "Missing RESEND_API_KEY — add it to package/.env.local (same value as Vercel) and restart `next dev`.",
            }
          : {}),
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "invalid_json" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("email" in body) ||
    !("name" in body)
  ) {
    return NextResponse.json({ success: false, error: "invalid_body" }, { status: 400 });
  }

  const rec = body as Record<string, unknown>;
  const name = typeof rec.name === "string" ? rec.name.trim() : "";
  const email = typeof rec.email === "string" ? rec.email.trim().toLowerCase() : "";
  const messageRaw = typeof rec.message === "string" ? rec.message.trim() : "";
  const locale: "en" | "sk" = rec.locale === "en" ? "en" : "sk";

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || name.length > 200 || email.length > 254 || messageRaw.length > 8000) {
    return NextResponse.json({ success: false, error: "invalid_fields" }, { status: 400 });
  }

  const greeting = greetingToken(name);

  const from = process.env.RESEND_FROM?.trim() || MAIL_FROM_DEFAULT;

  const plainLead = [`Meno / Name: ${name}`, `Email: ${email}`, `Jazyk / Locale: ${locale}`, "", messageRaw || "(bez správy)"].join(
    "\n",
  );

  const htmlLead = `
    <p><strong>Meno / Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    <p><strong>Jazyk / Locale:</strong> ${escapeHtml(locale)}</p>
    <hr />
    <p style="white-space:pre-wrap;">${escapeHtml(messageRaw || "(bez správy)")}</p>
  `.trim();

  try {
    const resend = new Resend(apiKey);

    const { error: leadError } = await resend.emails.send({
      from,
      to: [CONTACT_INBOX],
      replyTo: email,
      subject: `Kontakt z webu: ${name}`,
      text: plainLead,
      html: htmlLead,
    });

    if (leadError) {
      console.error("[contact] Resend lead error:", leadError);
      return NextResponse.json({ success: false, error: "send_failed" }, { status: 502 });
    }

    const siteOrigin = getSiteUrl();
    const ackProps = {
      locale,
      greetingFirstName: greeting,
      message: messageRaw,
      siteOrigin,
      logoMainSrc: absoluteUrl(CONTACT_ACK_MARK_PATH),
      logoFooterSrc: absoluteUrl(CONTACT_ACK_MARK_PATH),
      avatarSrc: absoluteUrl(STUDIO_CONTACT_MANAGER_PROFILE.image),
      managerName: STUDIO_CONTACT_MANAGER_PROFILE.name,
      managerPosition: STUDIO_CONTACT_MANAGER_PROFILE.position,
      managerPhone: STUDIO_CONTACT_MANAGER_PROFILE.phone,
      managerMailboxDisplay: CONTACT_INBOX,
    };

    const ackHtml = await renderAckEmail(createElement(ContactAcknowledgementEmail, ackProps));
    const ackText = await renderAckEmail(createElement(ContactAcknowledgementEmail, ackProps), {
      plainText: true,
    });

    const subjectAck =
      locale === "en" ? "Thanks for your message — Studio32" : "Ďakujeme za správu — Studio32";

    const { error: ackError } = await resend.emails.send({
      from,
      to: [email],
      replyTo: CONTACT_INBOX,
      subject: subjectAck,
      text: ackText,
      html: ackHtml,
    });

    if (ackError) {
      console.error("[contact] acknowledgement email failed:", ackError);
      /* Lead už je na hello@… — návštevníkovi nesťažovať formulár false success */
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[contact]", e);
    return NextResponse.json({ success: false, error: "send_failed" }, { status: 502 });
  }
}
