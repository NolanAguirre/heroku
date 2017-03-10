var db = require('../db')

exports.login = function(req, res) {
    db.one('SELECT password FROM users WHERE username =  $1', req.body.user.username)
        .then(function(data) {
            if (data.password == req.body.user.password) {
                res.json({
                    logged: true,
                    username: req.body.user.username,
                    name: "dave",
                    profilePicture: "",
                    friends: loadFriends(req.body.user.username)
                });
            } else {
                res.send(false).status(200);
            }
        })
        .catch(function(error) {
            console.log('ERROR:' + error);
            res.send(false).status(200);
        })
}

function loadFriends(username) {
    var friends = [];
    var friendsObj = [];
    db.one('SELECT friends FROM users WHERE username = $1', username)
        .then(function(data) {
            friends.push(data.username)
        })
        .catch(function(error) {
            console.log('ERROR:' + error);
        })
    friends.forEach(function(freind) {
        db.one('SELECT 1 FROM users WHERE username = $1', username)
            .then(function(data) {
                friendsObj.push({
                    username: data.username,
                    name: data.name,
                    profilePicture: data.profilePicture
                })
            })
            .catch(function(error) {
                console.log('ERROR:' + error);
            })
    })
    return friendsObj;
}
