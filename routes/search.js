var express = require('express');
var router = express.Router();

// render the search page
router.get('/' , function(req,res){
    res.render('search');
});

module.exports = router;