import express = require("express");
import { env } from "process";
const app = express()

app.get('/', (req, res) => {
    res.redirect("https://github.com/Catamondium/");
});

app.get('/hello', (req, res) => {
    res.send("Hello world");
});

app.listen(env.PORT, () => {
    console.log(`Active on localhost:${env.PORT}`);
});