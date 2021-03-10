import * as express from "express";
import * as helmet from "helmet";
import * as path from "path";
import { api } from "./api";


import { env } from "process";
const PORT = env.PORT;

// boilerplate & protection
const app = express();
app.use(helmet());

// static front
app.use(express.static(path.join(__dirname, "../public")));

// routing modules
app.use('/api', api);

// Catchall 404
app.use((req, res) => {
    res.status(404).send(`Not found: ${req.originalUrl}`);
})

app.listen(PORT, () => {
    console.log(`Listening 0.0.0.0:${PORT}`);
});