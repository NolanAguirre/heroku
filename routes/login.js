var db = require('../db')

exports.login = function(req ,res){
    db.one('SELECT password FROM users WHERE username =  $1', req.body.user.username)
        .then(function(data) {
            if (data.password == req.body.user.password){
                res.json({
                    logged: true,
                    username: req.body.user.username,
                    name: "dave",
                    profilePicture: ""
                });
            }else{
                res.send(false).status(200);
            }
        })
        .catch(function(error) {
            console.log('ERROR:' + error);
            res.send(false).status(200);
        })
}
