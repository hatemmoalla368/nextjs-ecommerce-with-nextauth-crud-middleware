import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendActivationEmail = async (email, token) => {
  const activationLink = `${process.env.NEXTAUTH_URL}/api/activate?token=${token}`;

  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Activate Your Account',
    html: `
      <h1>Welcome!</h1>
      <p>Click <a href="${activationLink}">here</a> to activate your account.</p>
    `,
  });
};