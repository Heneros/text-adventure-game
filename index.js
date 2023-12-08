const fs = require('fs')
const express = require('express');

const app = express();

app.use(express.static('./public'));
app.use(express.json());

const port = 4000;
const start = async () => {
    try {
        app.listen(port, console.log(`Working on port ${port} `));
    } catch (error) {
        console.log(error)
    }
}

start();

// fs.readFile("./assets/js/data/gameData.json", "utf8", (error, data) => {
//     if (error) {
//         console.log(error);
//         return;
//     }
//     console.log(JSON.parse(data));
// })