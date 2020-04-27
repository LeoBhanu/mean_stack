// we define all api end points
//database connections are happened here

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// mongoose.Promise = global.Promise;
const mongoose = require('mongoose'); //mongoose translates data in the data base to a java script object for use in our application

const db = "mongodb://127.0.0.1:27017/employee";

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) { console.log('error:' + err) } else { console.log('connected to mongodb') }
});


function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('unauthorization request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('unauthorized request');
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('unauthorized request');
    }
    req.userId = payload.subject;
    next();
}


router.get('/', (req, res) => {
    res.send('from api route');
}); //handling get request

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((err, registeredUser) => {
        if (err) { console.log(err); } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token });
        }
    });
});



router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({ email: userData.email }, (err, user) => {
        if (err) { console.log(err); } else {
            if (!user) { res.status(401).send('invalid email'); } else if (user.password !== userData.password) {
                res.status(401).send('invalid password');
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({ token });
            }
        }
    });
});


router.get('/events', (req, res) => {
    let events = [{
            "_id": "1",
            "name": "Books Expo",
            "description": "Different types of books are exhibited",
            "date": "2020-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Tech Expo",
            "description": "Different technology products are exibited ",
            "date": "2020-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Robo Expo",
            "description": "robotic technology exhibition",
            "date": "2020-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Cultural events",
            "description": "dance,magic shows etc",
            "date": "2020-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "models",
            "description": " Different styles of modelling exhibition",
            "date": "2020-04-23T18:25:43.511Z"
        }
    ];
    res.json(events);
});

router.get('/special', verifyToken, (req, res) => {
    let events = [{
            "_id": "1",
            "name": "Fashion Show",
            "description": "Different fashion items exhibited by models from corners of the world",
            "date": "2020-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Inventions",
            "description": "The new generation inventions Exhibition",
            "date": "2020-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Mr and Miss World Competition",
            "description": "No comments",
            "date": "2020-04-23T18:25:43.511Z"
        }
    ];
    res.json(events);
});
module.exports = router; //exporting the router