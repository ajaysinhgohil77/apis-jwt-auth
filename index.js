require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// making db connection
const dbConnection = require('./models');
dbConnection.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "health check route" });
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const PORT = process.env.NODE_PORT || 8080;
app.listen(PORT, () => {
    console.log(`service is up on port : ${PORT}`);
});