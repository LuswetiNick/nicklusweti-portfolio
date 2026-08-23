"use server";

import { headers } from "next/headers";
import { render } from "react-email";
import { Resend } from "resend";
import ContactMessageEmail from "@/emails/contact-message";

const inquiryTypes = [
  "Employment Opportunity",
  "Contract Opportunity",
  "Product Collaboration",
  "Other",
] as const;

type ContactField = "name" | "email" | "inquiryType" | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<ContactField, string>>;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimits = new Map<string, RateLimitEntry>();
const rateLimitWindow = 10 * 60 * 1000;
const rateLimitMaximum = 4;

function readText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const current = rateLimits.get(key);

  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + rateLimitWindow });
    return false;
  }

  if (current.count >= rateLimitMaximum) {
    return true;
  }

  current.count += 1;

  if (rateLimits.size > 500) {
    for (const [entryKey, entry] of rateLimits) {
      if (entry.resetAt <= now) {
        rateLimits.delete(entryKey);
      }
    }
  }

  return false;
}

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = readText(formData, "name").replace(/\s+/g, " ");
  const email = readText(formData, "email").toLowerCase();
  const inquiryType = readText(formData, "inquiryType");
  const message = readText(formData, "message");
  const website = readText(formData, "website");

  if (website) {
    return {
      status: "success",
      message: "Thanks — your message has been sent.",
    };
  }

  const errors: Partial<Record<ContactField, string>> = {};

  if (name.length < 2) {
    errors.name = "Enter your full name.";
  } else if (name.length > 100) {
    errors.name = "Keep your name under 100 characters.";
  }

  if (!validateEmail(email)) {
    errors.email = "Enter a valid email address.";
  } else if (email.length > 254) {
    errors.email = "Keep your email under 254 characters.";
  }

  if (!inquiryTypes.includes(inquiryType as (typeof inquiryTypes)[number])) {
    errors.inquiryType = "Choose an inquiry type.";
  }

  if (message.length < 20) {
    errors.message = "Tell me a little more — use at least 20 characters.";
  } else if (message.length > 2000) {
    errors.message = "Keep your message under 2,000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please review the highlighted fields and try again.",
      errors,
    };
  }

  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const clientAddress =
    forwardedFor?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";
  const rateLimitKey =
    clientAddress === "unknown" ? `email:${email}` : `ip:${clientAddress}`;

  if (checkRateLimit(rateLimitKey)) {
    return {
      status: "error",
      message:
        "Too many messages were sent recently. Please wait ten minutes or email me directly.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return {
      status: "error",
      message:
        "The contact form is temporarily unavailable. Please email me directly at luswetideveloper@gmail.com.",
    };
  }

  const emailTemplate = (
    <ContactMessageEmail
      name={name}
      email={email}
      inquiryType={inquiryType}
      message={message}
    />
  );

  try {
    const resend = new Resend(apiKey);
    const plainText = await render(emailTemplate, { plainText: true });
    const { error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ??
        "Nick Lusweti Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL ?? "luswetideveloper@gmail.com",
      replyTo: email,
      subject: `${inquiryType} from ${name}`,
      react: emailTemplate,
      text: plainText,
    });

    if (error) {
      console.error("Resend contact form error:", error);
      return {
        status: "error",
        message:
          "Your message could not be sent. Please try again or email me directly.",
      };
    }

    return {
      status: "success",
      message: "Thanks — your message has been sent. I’ll get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      status: "error",
      message:
        "Your message could not be sent. Please try again or email me directly.",
    };
  }
}
