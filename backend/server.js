const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const authRouted = require('./routes/auth');

const itemRoutes = require('./routes/items');
const lostItemsRoutes = require("./routes/lostItems");
const app = express();
const PORT = process.env.PORT || 8020;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use('/api/items', itemRoutes);
app.use('/api/auth', authRouted);
app.use("/api/lost-items", lostItemsRoutes);

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:8020");
});