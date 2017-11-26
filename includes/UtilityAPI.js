
var express = require('express');

function UtilityAPI(app, db, auth, Shows, Episodes, NowPlaying, CurrentShow){
   
    app.get('/api/utility/currentshow', auth, function(req,res){
       CurrentShow.getCurrentShow().then(
            function(currentShow){
                res.send(currentShow);
            },
            function(){
                res.status(500).send();
            }
       )
    });

    app.post('/api/utility/currentshow', auth, express.json(), function(req, res){
        CurrentShow.setCurrentShow(req.body).then(function(currentShow){
            res.send(currentShow);
        }, function(err){
            res.status(500).send();
        });
    });

    app.delete('/api/utility/currentshow', auth, function(req,res){
        CurrentShow.clearCurrentShow().then(function(currentShow){
            res.send(currentShow);
        }, function(err){
            res.status(500).send();
        });
    });


    /* Episodes */

    app.post('/api/utility/episode/', auth, express.json(), function(req, res){

        Episodes.insert(req.body).then(function(episode){
                res.send(episode);
            },function(err){
                res.status(400).send(err);
            });

    });

    app.post('/api/utility/episode/:id', auth, express.json(), function(req, res){
        var id = req.params.id;

        Episodes.update(id, req.body).then(function(show){
                res.send(show);
            },function(err){
                res.status(404).send(err);
            });

    });

    app.delete('/api/utility/episode/:id', auth, express.json(), function(req, res){

        Episodes.delete(req.params.id).then(function(show){
            res.status(200).send("Deleted episode " + req.params.id);
        },function(err){
            res.status(404).send(err);
        });

    });
}

module.exports = UtilityAPI;