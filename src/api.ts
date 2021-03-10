import * as express from "express";

export var api = express.Router();
api.get('/', (req, res) => {
    res.redirect("https://github.com/Catamondium/");
});

api.get('/hello', (req, res) => {
    res.send("Hello world");
});

api.use((req, res) => {
    res.status(404).send({url: `${req.originalUrl} does not exist`})
});