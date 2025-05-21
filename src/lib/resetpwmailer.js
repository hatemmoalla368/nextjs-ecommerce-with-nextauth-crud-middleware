import nodemailer from 'nodemailer';

export async function sendResetEmail(email, resetLink) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or your SMTP provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: '"Your App" <no-reply@yourapp.com>',
    to: email,
    subject: "Reset Your Password",
    html: `
      <p>Click below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>Link expires in 1 hour.</p>
    `,
  });
}