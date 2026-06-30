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
    return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const { recruiterName, jobDescription, phone, email } = body;

  if (!recruiterName?.trim() || recruiterName.trim().length < 2) {
    return NextResponse.json({ error: "Họ tên không hợp lệ." }, { status: 400 });
  }

  if (!jobDescription?.trim() || jobDescription.trim().length < 5) {
    return NextResponse.json(
      { error: "Mô tả vị trí không hợp lệ." },
      { status: 400 },
    );
  }

  if (!phone?.trim() || !isValidPhone(phone)) {
    return NextResponse.json(
      { error: "Số điện thoại không hợp lệ." },
      { status: 400 },
    );
  }

  if (!email?.trim() || !isValidEmail(email)) {
    return NextResponse.json({ error: "Email không hợp lệ." }, { status: 400 });
  }

  const gmailUser = process.env.GMAIL_APP_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;
  const contactTo = process.env.CONTACT_EMAIL_TO ?? gmailUser;

  if (!gmailUser || !gmailPassword) {
    return NextResponse.json(
      { error: "Hệ thống email chưa được cấu hình." },
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

  const subject = `Liên hệ công việc từ ${recruiterName.trim()}`;
  const text = [
    `Họ tên nhà tuyển dụng: ${recruiterName.trim()}`,
    `Mô tả / JD: ${jobDescription.trim()}`,
    `Số điện thoại: ${phone.trim()}`,
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
      { error: "Không thể gửi email. Vui lòng thử lại sau." },
      { status: 500 },
    );
  }
}
