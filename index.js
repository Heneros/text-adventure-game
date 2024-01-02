const fs = require('fs')
const express = require('express');
const session = require('express-session');

const app = express();

// let key = String(Math.random() * 1000);
// console.log(key)


app.use(express.static(__dirname + '/public'));

app.use(express.static('./views'));
app.use(express.json());
app.set('view engine', 'ejs');



let data = JSON.parse(fs.readFileSync('./data/textQuest.json'));

app.get("/", (req, res) => {
    res.render('welcome')
})

// let secretUnique = toString(Math.trunc(Math.random() * 1000));
// console.log(secretUnique)
// app.use(session({
//     secret: secretUnique,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }));

// app.get('/destroy', (req, res) => {
//     req.session.destroy(err => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Session destroy error');
//         } else {
//             res.redirect('/welcome');
//         }
//     });
// });

// app.get('*', function (req, res) {
//     res.redirect('/');
// });

// app.use((req, res, next) => {
//     console.log('Session:', req.session);
//     next();
// });


app.get('/:id', (req, res) => {
    let storyItem = data.find(item => item.id == req.params.id);
    if (!storyItem) {
        res.status(404).send('Not found');
        return;
    }

    // req.session.userChoices = req.session.userChoices || {};

    // if (storyItem.options && storyItem.options.length > 0) {
    //     storyItem.options.forEach(option => {
    //         const setStateValue = option.setState;
    //         // console.log(setStateValue)
    //         if (setStateValue === true) {
    //             req.session.userChoices['setState'] = true;
    //         } 
    //         else if (setStateValue === false) {
    //             req.session.userChoices['setState'] = false;
    //         }
    //     })
    // }
    // if (storyItem.options && storyItem.options.length > 0) {
    //     storyItem.options.forEach(option => {

    //         // Set setState to the value from the option object
    //         switch (option.setState) {
    //             case true:
    //                 req.session.userChoices['setState'] = true;
    //                 break;
    //             case false:
    //                 req.session.userChoices['setState'] = false;
    //                 break;
    //         }
    //     })
    // }



    res.render('index', { storyItem});
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

