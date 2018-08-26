const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");

const app = express();
const port = 3000;

// Set CORS headers
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(router);

app.get("/", function (req, res) {
    res.send("Bowling Server")
});

app.listen(port, function () {
    console.log("server running")
});