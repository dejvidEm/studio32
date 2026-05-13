import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/** Inbox for contact form submissions (fixed in repo; API key stays in Vercel env). */
const CONTACT_INBOX = "hello@studio32.sk";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "service_unavailable" },
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

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || name.length > 200 || email.length > 254 || messageRaw.length > 8000) {
    return NextResponse.json({ success: false, error: "invalid_fields" }, { status: 400 });
  }

  const from =
    process.env.RESEND_FROM?.trim() || "Studio32 <onboarding@resend.dev>";

  const plain = [`Meno / Name: ${name}`, `Email: ${email}`, "", messageRaw || "(bez správy)"].join(
    "\n",
  );

  const html = `
    <p><strong>Meno / Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    <hr />
    <p style="white-space:pre-wrap;">${escapeHtml(messageRaw || "(bez správy)")}</p>
  `.trim();

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [CONTACT_INBOX],
      replyTo: email,
      subject: `Kontakt z webu: ${name}`,
      text: plain,
      html,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ success: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[contact]", e);
    return NextResponse.json({ success: false, error: "send_failed" }, { status: 502 });
  }
}
