import * as express from "express";
import { access, constants } from "fs";
import * as path from "path";

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

viewer.use((req, res, next) => {
    // readable guard, avoids 500s
    access(
        path.join(__dirname, "../../pages/", req.url),
        constants.R_OK,
        (err) => {
            if (err) {
                next('router');
            } else {
                let title = req.url.replace(/.*\/(.)(.*)$/, replacer);
                res.render("pages" + req.url, {title: title});
            }
        });
});
export default viewer;