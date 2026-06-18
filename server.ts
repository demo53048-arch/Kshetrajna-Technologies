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
          body { margin: 0; padding: 0; background: #f3f4f6; color: #111827; font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
          .wrapper { width: 100%; max-width: 720px; margin: 0 auto; padding: 24px; }
          .card { border-radius: 28px; overflow: hidden; background: #ffffff; border: 1px solid rgba(148, 163, 184, 0.18); box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08); }
          .hero { padding: 32px; background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); color: #ffffff; text-align: center; }
          .hero h1 { margin: 0; font-size: 32px; line-height: 1.1; }
          .hero p { margin: 16px auto 0; max-width: 520px; color: rgba(241, 245, 249, 0.88); font-size: 15px; }
          .section { padding: 32px; }
          .section h2 { margin: 0 0 20px; font-size: 22px; letter-spacing: -0.02em; }
          .section p { margin: 0 0 20px; color: #475569; line-height: 1.75; }
          .details { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          .details td { padding: 12px 14px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #334155; }
          .details .label { font-weight: 700; background: #f8fafc; color: #0f172a; width: 36%; }
          .notice { margin-top: 24px; padding: 24px; border-radius: 24px; background: #eff6ff; border: 1px solid #dbeafe; }
          .notice h3 { margin: 0 0 10px; font-size: 16px; color: #0f172a; }
          .notice p { margin: 0; color: #334155; line-height: 1.75; }
          .footer { padding: 24px 32px; background: #f8fafc; text-align: center; font-size: 13px; color: #64748b; }
          .button { display: inline-block; margin-top: 18px; padding: 14px 28px; border-radius: 999px; background: #2563eb; color: #ffffff; text-decoration: none; font-weight: 700; }
          a { color: #2563eb; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="card">
            <div class="hero">
              <div style="display:inline-block; padding: 10px 20px; border-radius: 999px; background: rgba(59, 130, 246, 0.12); color: #ffffff; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase;">Kshetrajna Technologies</div>
              <h1>${formType === "contact" ? "Inquiry Received" : formType === "application" ? "Application Received" : formType === "quote" ? "Quote Request Received" : "Project Request Received"}</h1>
              <p>Your request is in expert review. Expect a reply soon.</p>
            </div>
            <div class="section">
              <h2>Hello ${name},</h2>
              <p>Thanks for reaching out. We have received your ${formType} request and our team will follow up with you shortly.</p>
              <table class="details">
                ${detailsHtml}
              </table>
              ${bodyText ? `
              <div class="notice">
                <h3>Message details</h3>
                <p style="white-space: pre-wrap;">${bodyText}</p>
              </div>
              ` : ""}
              <div class="notice">
                <h3>What happens next?</h3>
                <p>Our team will review your request and get back to you with a tailored response within one business day. If you want to update your request, reply to this email or contact us at <a href="mailto:support@kshetrajna.in">support@kshetrajna.in</a>.</p>
              </div>
            </div>
            <div class="footer">
              Kshetrajna Technologies LLP • Botad, Gujarat
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `Kshetrajna Technologies <${SMTP_USER}>`,
      replyTo: EMAIL_FROM || SMTP_USER,
      envelope: {
        from: SMTP_USER,
        to: recipient,
      },
      to: recipient,
      subject: emailSubjectMap[formType],
      text: plainTextMessage,
      html: htmlMessage,
    };

    console.log("Sending email with options:", {
      from: mailOptions.from,
      replyTo: mailOptions.replyTo,
      envelope: mailOptions.envelope,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    await transporter.sendMail(mailOptions);

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
