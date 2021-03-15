import fetch from "node-fetch";
import { env, exit} from "process";
import { setImmediate } from "timers";
const PORT = env.PORT || "3000"

fetch(`http://127.0.0.1:${PORT}`)
    .then(res => {
        if (res.status < 400) {
            exit(0);
        } else {
            console.error(`Error:\n${res.status}: ${res.statusText}`);
            // run on next loop, to allow logging
            setImmediate(() => exit(1));
        }})
    .catch(err => {
        console.error(`Calling error\n${err}`);
        setImmediate(() => exit(1));
    });