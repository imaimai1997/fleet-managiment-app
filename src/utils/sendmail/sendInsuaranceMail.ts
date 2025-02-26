import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAILUSER,
    pass: process.env.GMAILPASSWORD,
  },
});

export const sendInsuaranceMail = async (
  email: string,
  noticeUser: string[],
  carlabel: string,
) => {
  const info = await transporter.sendMail({
    from: process.env.GMAILUSER,
    to: email,
    cc: noticeUser,
    subject: `${carlabel}の車両保険の期限は残り1カ月です`,
    text: `こちらのメールは${carlabel}の車両管理者に送信しております。
    ${carlabel}の車両保険の期限まで残り1カ月となりました`,
  });

  console.log("Message sent: %s", info.messageId);
};
