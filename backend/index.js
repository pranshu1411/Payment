const express = require('express');
const bodyParser = require('body-parser');
const mainRouter = require('./routes/index');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/", mainRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});