const fs = require('fs')
const express = require('express');

const app = express();

app.use(express.static('./views'));
app.use(express.json());
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./data/textQuest.json'))
   // storyData  <-- it's key
    res.render('index', { storyData: data });
});

const port = 4000;
const start = async () => {
    try {
        app.listen(port, console.log(`Working on port ${port} `));
    } catch (error) {
        console.log(error)
    }
}

start();

