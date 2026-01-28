require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const db = require('./models');
const { contactRouter } = require('./routes');

const port = process.env.SERVER_PORT;

app.use(cors({ origin: 'https://eduardbonea.com'}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend works!');
});

app.use('/api', contactRouter);

app.get('/reset', async (req, res) => {
    await db.sync({ force: true});
    res.status(200).json('The database has been successfully reset');
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});