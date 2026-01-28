const express = require('express');
const contactRouter = express.Router();

const { contactController } = require('../controllers');
const { contactFormLimiter } = require('../middlewares');

contactRouter.post('/sendEmail', contactFormLimiter, contactController);

module.exports = contactRouter;
