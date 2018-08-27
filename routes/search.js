var express = require('express');
var router = express.Router();
var axios = require('axios');

//-------------------------------------------------TO BE DELETED---------------------------------------------------------------
var apiKey = "YOUR KEY";
//-----------------------------------------------------------------------------------------------------------------------------

// render the search page
router.get('/' , function(req,res){
    res.render('search');
});

router.post('/' , function(req,res){
    var street = trim(req.body.street);
    var city = trim(req.body.city);
    var state = trim(req.body.state);
    var zip = trim(req.body.zipcode);

    if(city.length == 0 && state.length == 0 && zip.length == 0){
        res.render('search', {
            errors:"YES"
        });
    }
    else{
        var add = street + " " +city + " " + state + " " + zip;
        axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
            params:{
                address:add,
                key:apiKey
            }
        }).then(function(response) {
            console.log(response.data.results[0].geometry.location);
        })
        .catch(function(error){
            console.log(error);
        });
    }
});

function trim (myString){
    return myString.replace(/^\s+/,'').replace(/\s+$/,'');
}

module.exports = router;
