const fs = require('fs')
const express = require('express');

const app = express();



app.use(express.static(__dirname + '/public'));

app.use(express.static('./views'));
app.use(express.json());
app.set('view engine', 'ejs');



// app.get('/', (req, res) => {
//     const data = JSON.parse(fs.readFileSync('./data/textQuest.json'))
//     // storyData  <-- it's key
//     res.render('index', { storyData: data });
// });



let data = JSON.parse(fs.readFileSync('./data/textQuest.json'))

app.get('/:id', (req, res) => {
    let storyItem = data.find(item => item.id == req.params.id);
    if (!storyItem) {
        res.status(404).send('Not found');
        return;
    }
    res.render('index', { storyItem: storyItem });
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

