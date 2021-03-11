import * as express from "express";

export const api = express.Router();
api.get('/github', (req, res) => {
    res.redirect("https://github.com/Catamondium/");
});

api.get('/hello', (req, res) => {
    res.send("Hello world");
});

api.use((req, res) => {
    res.sendStatus(404);
});
export default api;