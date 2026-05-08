require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json())

const investorRoute = require('./routes/investorRoute')
const fundRoute = require('./routes/fundRoute')
const sipRoute = require('./routes/sipRoute')

app.use('/api/investors', investorRoute)
app.use('/api/funds', fundRoute)
app.use('/api/sips', sipRoute)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
