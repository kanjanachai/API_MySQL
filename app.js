const express = require('express');
const cors = require('cors');

const idcardRouter = require('./route/idcard');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/idcard', idcardRouter);

app.listen(3000, () => { console.log('Server is running') });