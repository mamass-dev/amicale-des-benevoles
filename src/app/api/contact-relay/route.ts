import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { posterName, posterEmail, senderName, senderEmail, senderMessage, listingType, context } =
      await request.json();

    // Validation
    if (!posterEmail || !senderName || !senderEmail || !senderMessage) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;

    // Build email content
    const typeLabel = listingType === "covoiturage" ? "covoiturage" : "hébergement";
    const subject = `[Amicale] Nouveau message pour votre annonce ${typeLabel}`;

    const html = `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; color: #1e3a5f;">
        <div style="background: #0d9488; padding: 20px 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; font-size: 18px; margin: 0;">Quelqu'un vous contacte !</h1>
        </div>
        <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
          <p>Bonjour <strong>${posterName}</strong>,</p>
          <p>Vous recevez ce message car quelqu'un est intéressé par votre annonce de <strong>${typeLabel}</strong> sur l'Amicale des Bénévoles.</p>

          ${context ? `<div style="background: #f0fdfa; border-left: 3px solid #0d9488; padding: 12px 16px; border-radius: 0 8px 8px 0; margin: 16px 0;">
            <p style="font-size: 13px; color: #666; margin: 0 0 4px 0;">Annonce concernée :</p>
            <p style="margin: 0; font-weight: 600;">${context}</p>
          </div>` : ""}

          <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p style="font-size: 13px; color: #666; margin: 0 0 8px 0;">Message de <strong>${senderName}</strong> :</p>
            <p style="margin: 0; white-space: pre-wrap;">${senderMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          </div>

          <p><strong>Pour répondre :</strong> envoyez un email directement à <a href="mailto:${senderEmail}" style="color: #0d9488; font-weight: 600;">${senderEmail}</a></p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px;">
            Cet email a été envoyé via la plateforme de l'Amicale des Bénévoles.<br/>
            Vos coordonnées n'ont pas été partagées avec l'expéditeur.
          </p>
        </div>
      </div>
    `;

    if (!resendKey) {
      // Mode dev sans Resend : log en console
      console.log(`[Contact Relay] ${senderName} (${senderEmail}) → ${posterName} (${posterEmail})`);
      console.log(`Message: ${senderMessage}`);
      return NextResponse.json({ message: "Message envoyé (mode dev)" });
    }

    // Envoi via Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Amicale des Bénévoles <noreply@amicaledesbenevoles.org>",
        to: posterEmail,
        reply_to: senderEmail,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[Resend error]", err);
      return NextResponse.json({ error: "Erreur d'envoi" }, { status: 500 });
    }

    return NextResponse.json({ message: "Message envoyé" });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
