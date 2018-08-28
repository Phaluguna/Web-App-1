var express = require('express');
var router = express.Router();
var axios = require('axios');

//-------------------------------------------------TO BE DELETED---------------------------------------------------------------
var apiKey = "AIzaSyCqeWr16WjcdM69n0VSycM4yHS8tuEKxo0";
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
    var businesstype = req.body.businesstype;
    var radius = req.body.radius;


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
            //console.log(response.data.results[0].geometry.location);
            var loc = response.data.results[0].geometry.location.lat +","+response.data.results[0].geometry.location.lng;
            axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
                params:{
                    location : loc,
                    radius: radius + "000" ,
                    type : businesstype,
                    key : apiKey
                }
            }).then(function(response1) {
                //console.log(response1.data.results);
                res.render('results', {
                    data:{
                        filter:{
                            street : street,
                            city : city,
                            state : state,
                            zip : zip,
                            businesstype : businesstype ,
                            radius : radius
                        },
                        result : response1.data.results
                    }
                });
            })
            .catch(function(error1){
                console.log(error1);
            });
        })
        .catch(function(error){
            console.log(error);
            res.render('results' , {
                error:error
            });
        });
    }
});

function trim (myString){
    return myString.replace(/^\s+/,'').replace(/\s+$/,'');
}

module.exports = router;
