import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";
dotenv.config();
const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: password,
  },
});

export const sendAcknowledgeEmail = async (
  tomail: string,
  subject: string,
  message: string
): Promise<SMTPTransport.SentMessageInfo> => {
  const mailOptions = {
    from: `"Summit.AI" <${email}>`, // sender address
    to: tomail, // list of receivers
    subject: subject, // Subject line
    html: message, // plain text body
  };
  try {
    // send mail with defined transport object
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    //  Handle errors here

    throw error;
  }
};

export const sendOTP = async (
  tomail: string,
  subject: string,
  message: string
): Promise<SMTPTransport.SentMessageInfo> => {
  const mailOptions = {
    from: `"Summit.AI" <${email}>`, // sender address
    to: tomail, // list of receivers
    subject: subject, // Subject line
    html: message, // plain text body
  };
  try {
    // send mail with defined transport object
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    //  Handle errors here

    throw error;
  }
};

export const sendResetPasswordLink = async (
  tomail: string,
  subject: string,
  message: string
): Promise<SMTPTransport.SentMessageInfo> => {
  const mailOptions = {
    from: `"Summit.AI" <${email}>`, // sender address
    to: tomail, // list of receivers
    subject: subject, // Subject line
    html: message, // plain text body
  };
  try {
    // send mail with defined transport object
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    //  Handle errors here

    throw error;
  }
};
