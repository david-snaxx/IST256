const express = require('express');
const app = express();
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootpassword",
    port: 3306,
    database: "ConfDB"
});

connection.connect(err => {
    if (err) console.log(err);
    console.log("Connected!");
});

app.use(express.json());
// allow cross-origin requests
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (request.method === 'OPTIONS') {
        return response.sendStatus(204);
    }
    next();
})
app.listen(3306, () => {
    console.log("REST DB server running on http://localhost:3306");
})

const conferenceRoute = require("./routes/conferenceRoute.js");
app.use("/conferences", conferenceRoute(connection));