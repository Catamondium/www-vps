import * as express from "express";

const viewer = express.Router();
viewer.use((req, res, next) => {
    req.app.locals.world.title ||= req.get("host");
    next();
});

viewer.get("/", (req, res) => {
    res.render("pages/index", {title: `Home`});
});

const replacer = (_match, first, rest) => {
    return first.toUpperCase() + rest.toLowerCase()
    };

viewer.use((req, res) => {

    let title = req.url.replace(/.*\/(.)(.*)$/, replacer);

    res.render("pages" + req.url, {title: title});
});
export default viewer;