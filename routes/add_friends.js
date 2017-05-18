var express = require('express');
var router = express.Router();
var db = require('../db');
router.use(function timeLog(req, res, next) {
    next();
});
router.post('/', function(req, res) {
    db.one('SELECT 1 FROM users WHERE username =  $1', req.body.friend)
        .then(function(data) {
            res.json({
                username: data.username,
                name: data.name,
                profilePicture: ""
            });
        })
        .catch(function(error) {
            console.log('ERROR:' + error);
        })
})
router.put('/', function(req, res) {
    //add friends username to users
    // add your username to friends
    db.none("UPDATE users SET friends = array_cat(friends, $1) WHERE username = $2", req.body.friend.username, req.body.username).then(function(data) {
            if (data.exists) {
                res.send(true).status(200);
            } else {
                res.send(false).status(200);
            }
        })
        .catch(function(error) {
            console.log('ERROR:' + error)
        })

    db.none("UPDATE users SET friends = array_cat(friends, $1) WHERE username = $2", req.body.username, req.body.friend.username).then(function(data) {
            if (data.exists) {
                res.send(true).status(200);
            } else {
                res.send(false).status(200);
            }
        })
        .catch(function(error) {
            console.log('ERROR:' + error)
        })

    db.none('INSERT INTO ' + req.body.user.username + '(username, message[20], sent VALUES $1 , NULL);', req.body.friend)
        .then(function(data) {
            if (data.exists) {
                res.send(true).status(200);
            } else {
                res.send(false).status(200);
            }
        })
        .catch(function(error) {
            console.log('ERROR:' + error)
        })
})
