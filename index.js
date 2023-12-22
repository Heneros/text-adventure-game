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

let secretUnique = String(Math.trunc(Math.random() * 1000));
console.log(secretUnique)
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

    if (!req.session.userChoices) {
        req.session.userChoices = {};
    }

    if (storyItem.options && storyItem.options.length > 0) {
        storyItem.options.forEach(option => {
            if (option.setState && Object.keys(option.setState).length > 0) {
                for (const key in option.setState) {
                    if (Object.prototype.hasOwnProperty.call(option.setState, key)) {
                        req.session.userChoices[key] = req.session.userChoices[key] || option.setState[key];
                    }
                }
            }
        });
    }



    res.locals.userChoices = req.session.userChoices || {};

    res.render('index', { storyItem, userChoices: res.locals.userChoices });
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

