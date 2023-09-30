import mailer, { createTransport } from "nodemailer";

const send = async (to, subject, html, text) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });

    const mailOpts = {
      to,
      subject,
      html,
      text,
      from: process.env.MAILER_USER,
    };

    const info = await transporter.sendMail(mailOpts);

    console.log(info.envelope);
    return {
      code: 200,
      success: true,
      data: info,
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      error,
      success: false,
    };
  }
};

export default send;
