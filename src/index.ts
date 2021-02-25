import express = require('express');
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.redirect("https://github.com/Catamondium/");
})

app.get('/hello', (req, res) => {
    res.send("Hello world")
})

app.listen(port, () => {
    console.log(`Active on localhost:${port}`)
})