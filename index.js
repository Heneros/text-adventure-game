const fs = require('fs')


fs.readFile("./assets/js/data/gameData.json", "utf8", (error, data) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log(JSON.parse(data));
})