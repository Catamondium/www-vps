import * as express from "express";

export var www = express.Router();
www.get('/', (req, res) => {
    res.redirect("https://github.com/Catamondium/");
});

www.get('/hello', (req, res) => {
    res.send("Hello world");
});

www.use((req, res) => {
    res.status(404).send({url: `${req.originalUrl} does not exist`})
});