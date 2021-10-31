const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('../models/movie');
const imdb = require('imdb-api');

router.get('/movieById', (req, res) => {
    var movieID = req.query.id;
    Movie.find({ id: movieID }).exec((err, data) => {
        if (err) {
            res.json({ messsage: err.message })
        } else {

            if (data.length == 0) {
                movieID = movieID.toString();
                // var search = ImdbByID("tt0090190");
                // res.json(ImdbByID("tt0090190"));

                imdb.search({
                    id: movieID
                }, {
                    apiKey: 'a2c8063b'
                }).then((data) => {
                    console.log(data);
                    res.json(data);
                    // return data;
                }).catch((err) => {
                    console.log(err);
                    res.json(err);
                    // return err;
                });




            } else {
                res.json(data);
            }

        }
    })

});

router.get('/movieByTitle', (req, res) => {
    var movieTitle = req.query.title;
    Movie.find({ title: movieTitle }).exec((err, data) => {
        if (err) {
            res.json({ messsage: err.message })
        } else {

            res.json(data);
        }
    })
});

router.get('/movieByYear', (req, res) => {
    var s = req.query.sdate;
    var e = req.query.edate;

    Movie.find({ releasedyear: { $gte: new Date(s), $lte: new Date(e) } }).exec((err, data) => {
        if (err) {
            res.json({ messsage: err.message })
        } else {

            if (data.length == 0) {
                res.json({ messsage: "DATA NOT FOUND" })
            } else {
                res.json(data);
            }

        }
    });

});


router.get('/movieByRating', (req, res) => {
    var rang = req.query.range;
    var movieRate = req.query.rate;

    if (rang == 'l') {
        Movie.find({ rating: { $lte: movieRate } }).exec((err, data) => {
            if (err) {
                res.json({ messsage: err.message })
            } else {
                if (data.length == 0) {
                    res.json({ messsage: "Data Not Found" })
                } else {

                    if (data.length == 0) {
                        res.json({ messsage: "DATA NOT FOUND" })
                    } else {
                        res.json(data);
                    }

                }

            }
        });
    } else {
        Movie.find({ rating: { $gte: movieRate } }).exec((err, data) => {
            if (err) {
                res.json({ messsage: err.message })
            } else {

                if (data.length == 0) {
                    res.json({ messsage: "DATA NOT FOUND" })
                } else {
                    res.json(data);
                }

            }
        });
    }

});


router.get('/movieByGenres', (req, res) => {
    var movieGenres = req.query.genres;
    console.log(movieGenres)
    Movie.find({ genres: { "$in": [movieGenres] } }).exec((err, data) => {
        if (err) {
            res.json({ messsage: err.message })
        } else {

            if (data.length == 0) {
                res.json({ messsage: "DATA NOT FOUND" })
            } else {
                res.json(data);
            }

        }
    })

});

//=======================================================================================================================


function ImdbByID(idParam) {

    imdb.search({
        id: idParam
    }, {
        apiKey: 'a2c8063b'
    }).then((data) => {
        console.log(data);
        return data;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}



module.exports = router;