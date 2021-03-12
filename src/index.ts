import * as express from "express";
import * as helmet from "helmet";
import * as path from "path";
import api from "./api";

import { env } from "process";
const PORT = env.PORT || 3000;

// boilerplate & middleware
const app = express();
const ISPROD = app.locals.settings.env === 'production';
app.use(helmet());

// routing modules
app.use('/api', api);

// static front
app.use(express.static(path.join(__dirname, "../public")));

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