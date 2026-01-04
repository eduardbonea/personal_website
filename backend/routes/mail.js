require('dotenv').config();
const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const Contact = require('../models/contact');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/sendEmail', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Toate câmpurile sunt obligatorii!' });
    }

    try {
        await Contact.create({
            name: name,
            email: email,
            message: message
        });

            const msg = {
                to: process.env.TO_MAIL, 
                from: process.env.FROM_MAIL,
                replyTo: email,
                subject: `Contact Nou: ${name}`,
                html: `
                    <h3>Mesaj nou de pe site</h3>
                    <hr>
                    <p><strong>Nume:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Mesaj:</strong></p>
                    <p style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${message}</p>
                `
            };

        await sgMail.send(msg);
        
        res.status(200).json({ msg: 'Sent and saved in local DB' });

    } catch (err) {
        res.status(500).json('Server error!');
    }
});

module.exports = router;