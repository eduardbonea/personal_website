const { Resend } = require('resend');
const { contactModel } = require('../models');

const resend = new Resend(process.env.RESEND_API_KEY);

const contactController = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'Toate câmpurile sunt obligatorii!' });
  }

  try {
    await contactModel.create({ name, email, message });

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
        <p style="background:#f4f4f4;padding:10px;border-radius:5px;">
          ${message}
        </p>
      `,
    });

    if (data?.error) {
      console.error(data.error);
      return res.status(500).json({ msg: 'Eroare la trimiterea emailului' });
    }

    return res.status(200).json({ msg: 'Sent and saved in local DB', id: data.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error!' });
  }
};

module.exports = { contactController };
