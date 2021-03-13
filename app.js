require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port = 3000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('db connected'))
    .catch(e => console.error(e));

const dataRoutes = require('./routes/index');

app.use(express.json());
app.use('/', dataRoutes);

app.listen(port, () => {
    console.log(`Listen on ${ port }`);
})