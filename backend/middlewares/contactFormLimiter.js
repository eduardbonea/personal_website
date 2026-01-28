const rateLimit = require('express-rate-limit');

const contactFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 3,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (req, res) => {
    console.log('Rate limited');
    return res.status(429).json({ msg: 'Ai atins limita de mesaje' });
  },
});

module.exports = { contactFormLimiter };
