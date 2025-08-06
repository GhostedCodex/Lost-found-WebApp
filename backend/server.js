const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouted = require('./routes/auth');

require('dotenv').config();

const itemRoutes = require('./routes/items');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/items', itemRoutes);
app.use('/api/auth', authRouted);

const PORT = process.env.PORT || 8020;
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:8020");
});