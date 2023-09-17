import nodemailer from "nodemailer";
import mailGun from "nodemailer-mailgun-transport";
import dotenv from "dotenv";
dotenv.config();

const auth = {
    auth: {
        api_key: process.env.MAILGUN_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

export const sendContactEmail = async (req, res) => {
    const { email, subject, content } = req.body;

    const mailOptions = {
        from: email,
        to: 'bocianalizee@gmail.com',
        subject: subject,
        text: content
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Message Sent!!!');
        res.json({ message: `Hello ${email}, your message has been successfully sent!` });
    } catch (err) {
        console.error('An error occurred:', err);
        res.status(500).json({ error: 'An error occurred while sending the email' });
    }
};
