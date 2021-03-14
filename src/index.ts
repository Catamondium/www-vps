import * as express from "express";
import * as helmet from "helmet";
import * as path from "path";
import api from "./api";

import { env } from "process";
const PORT = env.PORT || 3000;


// boilerplate & middleware
const app = express();
app.set("view engine", "ejs");
const ISPROD = app.locals.settings.env === 'production';

app.locals.world = {
    title: "EJS test page",//FILL domain name
    map: [ // GEN from views/pages?
        {name: "Home", link: "/"},
        {name: "About", link: "/about"},
        {name: "DDown", children: [
            {name: '1', link: '#'},
            {name: '2', link: '#'},
            {name: '3', link: '#'}
        ]}
    ],
    foot_text: "Be gay, do code<br>Powered by Express & EJS"
}

app.use(helmet());

// Namspaced routes
app.use('/api', api);

// General routes
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
    res.render("pages/index");
});

app.get("/about", (req, res) => {
    res.render("pages/about");
});

// Catchall 404
app.use((req, res) => {
    if (ISPROD) {
        res.sendStatus(404);
    } else {
        res.status(404).send(`Not Found: ${req.originalUrl}`);
    }
});

app.listen(PORT, () => {
    console.log(`Listening 0.0.0.0:${PORT} '${app.locals.settings.env}'`);
});