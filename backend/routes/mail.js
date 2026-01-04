require('dotenv').config();
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/contact');

router.post('/sendEmail', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await Contact.create({
            name: name,
            email: email,
            message: message
        });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

        const mailOptions = {
            from: `"Website Bot" <${process.env.EMAIL_USER}>`,
            to: process.env.TO_MAIL,
            subject: `New message from: ${name}`,
            text: `You have a new message stored in DB. \n \n 
            From: ${email} \n 
            Message: ${message}`
        };

        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ msg: 'Salvat cu Sequelize și Email Trimis!' });

    } catch (err) {
        console.error("Eroare:", err);
        res.status(500).json({ msg: 'Eroare la server', error: err.message });
    }
});

module.exports = router;