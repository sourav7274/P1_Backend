const express = require('express');
const { initialDatabase } = require('./db/db.conect');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

const Game = require('./models/games.models');
const Jacket = require('./models/jacket.models');
const Phone = require('./models/phone.models');
const Book = require('./models/books.models');

initialDatabase();

app.get('/', (req, res) => {
    res.json({ message: "Welcome to API" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
