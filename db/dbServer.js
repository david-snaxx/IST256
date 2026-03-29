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

const conferenceRoute = require("./conferenceRoute.js");
app.use("/conference", conferenceRoute(connection));