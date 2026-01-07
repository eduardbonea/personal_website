require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const Contact = require('../models/contact');

const resend = new Resend(process.env.RESEND_API_KEY);

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

        const data = await resend.emails.send({
            from: process.env.FROM_MAIL,
            to: process.env.TO_MAIL,
            reply_to: email,
            subject: `Contact Nou: ${name}`,
            html: `
                <h3>Mesaj nou de pe site</h3>
                <hr>
                <p><strong>Nume:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mesaj:</strong></p>
                <p style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${message}</p>
            `
        });

        if (data.error) {
            console.error(data.error);
            return res.status(500).json({ msg: 'Eroare la trimiterea emailului prin Resend' });
        }
        
        res.status(200).json({ msg: 'Sent and saved in local DB', id: data.id });

    } catch (err) {
        console.error(err);
        res.status(500).json('Server error!');
    }
});

module.exports = router;