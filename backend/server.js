const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const itemRoutes = require('./routes/items');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/items', itemRoutes);

app.listen(8020, () => {
    console.log("Server is running on http://localhost:8020");
});