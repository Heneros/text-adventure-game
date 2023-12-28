const fs = require('fs')
const express = require('express');
const session = require('express-session');

const app = express();

let key = String(Math.random() * 1000);
// console.log(key)


app.use(express.static(__dirname + '/public'));

app.use(express.static('./views'));
app.use(express.json());
app.set('view engine', 'ejs');



let data = JSON.parse(fs.readFileSync('./data/textQuest.json'));

app.get("/", (req, res) => {
    res.render('welcome')
})

let secretUnique = toString(Math.trunc(Math.random() * 1000));
// console.log(secretUnique)
app.use(session({
    secret: secretUnique,
    resave: true,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    console.log('Session:', req.session);
    next();
});


app.get('/:id', (req, res) => {
    let storyItem = data.find(item => item.id == req.params.id);
    if (!storyItem) {
        res.status(404).send('Not found');
        return;
    }
    const hasSetStateOption = storyItem.options.some(option => option.setState !== undefined)
    res.locals.userChoices = req.session.userChoices || {};
    if (hasSetStateOption) {
        storyItem.options.forEach(option => {
            res.locals.userChoices[option.text] = option.setState;
        });
    } else {
        console.log(false);
    }

    



    res.render('index', { storyItem, userChoices: res.locals.userChoices });
});

app.get('/destroy', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/welcome');
        }
    })
})

const port = 4000;
const start = async () => {
    try {
        app.listen(port, console.log(`Working on port ${port} `));
    } catch (error) {
        console.log(error)
    }
}

start();

