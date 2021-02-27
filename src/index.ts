import express = require("express");
import helmet = require("helmet");
import { env } from "process";

const PORT = env.PORT;

const app = express();
app.use(helmet());

app.get('/', (req, res) => {
    res.redirect("https://github.com/Catamondium/");
});

app.get('/hello', (req, res) => {
    res.send("Hello world");
});

app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'});
})

app.listen(PORT, () => {
    console.log(`Active on localhost:${PORT}`);
});