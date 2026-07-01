import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  recruiterName: string;
  jobDescription: string;
  phone: string;
  email: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 11;
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request data." }, { status: 400 });
  }

  const { recruiterName, jobDescription, phone, email } = body;

  if (!recruiterName?.trim() || recruiterName.trim().length < 2) {
    return NextResponse.json({ error: "Invalid name." }, { status: 400 });
  }

  if (!jobDescription?.trim() || jobDescription.trim().length < 5) {
    return NextResponse.json(
      { error: "Invalid role description." },
      { status: 400 },
    );
  }

  if (!phone?.trim() || !isValidPhone(phone)) {
    return NextResponse.json(
      { error: "Invalid phone number." },
      { status: 400 },
    );
  }

  if (!email?.trim() || !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const gmailUser = process.env.GMAIL_APP_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;
  const contactTo = process.env.CONTACT_EMAIL_TO ?? gmailUser;

  if (!gmailUser || !gmailPassword) {
    return NextResponse.json(
      { error: "Email system is not configured." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPassword,
    },
  });

  const subject = `Work inquiry from ${recruiterName.trim()}`;
  const text = [
    `Recruiter name: ${recruiterName.trim()}`,
    `Role description / JD: ${jobDescription.trim()}`,
    `Phone: ${phone.trim()}`,
    `Email: ${email.trim()}`,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: contactTo,
      replyTo: email.trim(),
      subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send email. Please try again later." },
      { status: 500 },
    );
  }
}
