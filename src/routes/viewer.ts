import * as express from "express";
import { access, constants } from "fs";
import { env } from "process";
import * as path from "path";

const viewer = express.Router();
viewer.use((req, _res, next) => {
    req.app.locals.world.title ||= env.HNAME || req.get("host");
    next();
});

viewer.get("/", (_req, res) => {
    res.render("pages/index", {title: `Home`});
});

const replacer = (_match, first, rest) => {
    return first.toUpperCase() + rest.toLowerCase()
    };

viewer.use((req, res, next) => {
    // readable guard, avoids 500s
    const rpath = path.join(req.app.locals.srcdir, "../views/pages/", req.url) + ".ejs";
    access(
        rpath,
        constants.R_OK,
        (err) => {
            if (err) {
                next('router');
            } else {
                let title = req.url.replace(/.*\/(.)(.*)$/, replacer);
                res.render(rpath, {title: title});
            }
        });
});
export default viewer;