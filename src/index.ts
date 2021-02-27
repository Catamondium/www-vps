import * as express from "express";
import * as helmet from "helmet";
import { www } from "./www";

import { env } from "process";
const PORT = env.PORT;

// boilerplate & protection
const app = express();
app.use(helmet());

// routing modules
app.use(www);

// Catchall 404
app.use((req, res) => {
    res.status(404).send(`Not found: ${req.originalUrl}`);
})

app.listen(PORT, () => {
    console.log(`Listening 0.0.0.0:${PORT}`);
});