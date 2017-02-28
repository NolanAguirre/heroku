var express = require('express');
var router = express.Router();
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('chat router being used');
  next();
});

// define the about route
router.put('/',function(req, res) {

})
module.exports = router;
