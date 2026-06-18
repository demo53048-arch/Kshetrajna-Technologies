import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import type { ContactMessage } from "./src/types";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT ?? 5000);
const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? "587");
const SMTP_SECURE = process.env.SMTP_SECURE === "true";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM ?? SMTP_USER;
const staticPath = path.resolve("dist");

if (!SMTP_USER || !SMTP_PASS) {
  throw new Error("Missing SMTP_USER or SMTP_PASS environment variables in .env");
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  connectionTimeout: 10000,
});

transporter.verify().then(() => {
  console.log(`SMTP connection verified for ${SMTP_HOST}:${SMTP_PORT}`);
}).catch((error) => {
  console.error("SMTP verify failed:", error);
  console.error("Check Railway SMTP env vars and whether outbound SMTP is allowed.");
});

app.use(express.json());
app.use(express.static(staticPath));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "Kshetrajna Email API" });
});

app.post("/api/send-email", async (req, res) => {
  try {
    type FormType = "contact" | "application" | "quote" | "project";
    type EmailRequestBody = {
      type?: FormType;
      payload?: Record<string, unknown>;
      message?: Record<string, unknown>;
    };

    const { type, payload, message } = req.body as EmailRequestBody;
    const formType: FormType = (type as FormType) ?? "contact";
    const data = payload ?? message;

    if (!data || typeof data !== "object") {
      return res.status(400).json({ error: "Invalid request payload. Expected form data." });
    }

    const resolveField = (keys: string[]) => {
      for (const key of keys) {
        if (key in data && typeof data[key] === "string") {
          return data[key] as string;
        }
      }
      return "";
    };

    const recipient = resolveField(["email", "clientEmail", "candidateEmail"]);
    const name = resolveField(["name", "clientName", "candidateName"]);
    const subject = resolveField(["subject", "jobTitle", "serviceArea", "planName"]);
    const bodyText = resolveField(["message", "coverLetter", "requirements", "additionalFeatures"]);

    if (!recipient || !name) {
      return res.status(400).json({ error: "Missing recipient email or name in request payload." });
    }

    const emailSubjectMap: Record<FormType, string> = {
      contact: `Kshetrajna Technologies — Inquiry received: ${subject || "Your contact request"}`,
      application: `Kshetrajna Technologies — Application received for ${subject || "your selected role"}`,
      quote: `Kshetrajna Technologies — Quote request received for ${subject || "your requested service"}`,
      project: `Kshetrajna Technologies — Project request received for ${subject || "your selected plan"}`,
    };

    const detailsHtml = Object.entries(data)
      .filter(([key, value]) => typeof value === "string" && !["email", "name"].includes(key))
      .map(([key, value]) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;background:#f8fafc;font-size:14px;color:#334155;font-weight:600;">${key}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;background:#f8fafc;font-size:14px;color:#334155;">${value}</td>
        </tr>
      `)
      .join("");

    const plainTextMessage = `Kshetrajna Technologies\n${emailSubjectMap[formType]}\n\nHello ${name},\n\nThank you for submitting your ${formType} request. Our team has recorded your details and will follow up with you shortly.\n\n${Object.entries(data)
      .filter(([key, value]) => typeof value === "string" && !["email", "name"].includes(key))
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")}\n\n${bodyText ? `Message details:\n${bodyText}\n\n` : ""}If you need to update your request, reply to this email or contact us at support@kshetrajna.in.`;

    const htmlMessage = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${emailSubjectMap[formType]}</title>
        <style>
          @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
            50% { box-shadow: 0 0 0 24px rgba(59, 130, 246, 0); }
          }
          .pulse-border {
            animation: glowPulse 6s ease-in-out infinite;
          }
          .fade-in {
            animation: fadeIn 0.9s ease forwards;
            opacity: 0;
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }
        </style>
      </head>
      <body style="font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#eef2ff; color:#0f172a; margin:0; padding:24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:720px; margin:0 auto;">
          <tr>
            <td style="padding:0 0 18px; text-align:center;">
              <div style="display:inline-block; padding:18px 28px; border-radius:999px; background:linear-gradient(135deg, #2563eb 0%, #38bdf8 100%); color:#ffffff; font-size:13px; letter-spacing:0.1em; text-transform:uppercase;">Kshetrajna Technologies</div>
            </td>
          </tr>
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:32px; overflow:hidden; background:#ffffff; border:1px solid rgba(148, 163, 184, 0.18); box-shadow:0 24px 80px rgba(15, 23, 42, 0.08);">
                <tr>
                  <td style="padding:32px; background:linear-gradient(180deg, #0f172a 0%, #1e293b 100%); color:#f8fafc; text-align:center;">
                    <h1 style="margin:0; font-size:28px; letter-spacing:0.02em;">${formType === "contact" ? "Inquiry Received" : formType === "application" ? "Application Received" : formType === "quote" ? "Quote Request Received" : "Project Request Received"}</h1>
                    <p style="margin:12px 0 0; font-size:15px; color:rgba(241, 245, 249, 0.88);">Your request is in expert review. Expect a reply soon.</p>
                    <div style="margin:26px auto 0; width:76px; height:6px; border-radius:999px; background:rgba(255,255,255,0.16);"><div style="width:48px; height:100%; border-radius:999px; background:linear-gradient(90deg, #60a5fa, #38bdf8); box-shadow:0 0 18px rgba(56, 189, 248, 0.45);"></div></div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px;" class="fade-in">
                    <p style="margin:0 0 18px; font-size:16px; line-height:1.75; color:#334155;">Hello <strong>${name}</strong>,</p>
                    <p style="margin:0 0 24px; font-size:15px; line-height:1.8; color:#475569;">Thanks for reaching out. Here's a summary of the details we received from your ${formType} submission.</p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                      ${detailsHtml}
                    </table>
                    ${bodyText ? `
                    <div style="margin-top:24px; padding:20px; border-radius:24px; background:linear-gradient(180deg, #eff6ff 0%, #ffffff 100%); border:1px solid #dbeafe;">
                      <h2 style="margin:0 0 12px; font-size:17px; color:#0f172a;">Message details</h2>
                      <p style="margin:0; font-size:15px; line-height:1.85; color:#334155; white-space:pre-wrap;">${bodyText}</p>
                    </div>
                    ` : ""}
                    <div style="margin-top:30px; padding:24px; border-radius:26px; background:#f8fafc; border:1px solid #e2e8f0;" class="pulse-border">
                      <p style="margin:0 0 8px; font-size:14px; color:#0f172a; font-weight:700;">What happens next?</p>
                      <p style="margin:0; font-size:14px; line-height:1.8; color:#475569;">Our team will review this request and get back to you with a tailored response within one business day.</p>
                    </div>
                    <p style="margin:24px 0 0; font-size:14px; color:#64748b;">Need to make a change? Reply to this email or contact us at <a href="mailto:support@kshetrajna.in" style="color:#2563eb; text-decoration:none;">support@kshetrajna.in</a>.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 32px; background:#f8fafc; text-align:center; font-size:13px; color:#64748b;">
                    <p style="margin:0;">Kshetrajna Technologies LLP • Botad, Gujarat</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: EMAIL_FROM,
      to: recipient,
      subject: emailSubjectMap[formType],
      text: plainTextMessage,
      html: htmlMessage,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to send email." });
  }
});

app.get("/*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Express backend running at http://localhost:${PORT}`);
});
