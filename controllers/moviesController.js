const db = require('../database/models/index'); //traemos la variable db
const sequelize = db.sequelize; //traemos solo la porpiedad que nos sirve.
const Movies = require('../database/models/Movie');
const Op = db.Sequelize.Op;
const express = require('express');
const app = express();
const url = require('url');

const moviesController = {
    //Usando raw queries
    // index: function(req, res){
    //    sequelize.query('SELECT * FROM movies') //Ojo que van comillas dobles;
    //         .then(function(results){
    //             let moviesAll = results[0];

    //             return res.render('movies', { moviesAll });
    //         })
        
    // },
    index : function(req, res){
        // const condiciones = {
        //     order: [
        //         ['title', 'ASC'],
        //     ]
        // }
        db.Movies.findAll()
            .then(function(results){
                const moviesAll = results;
                //return res.send(moviesAll);
                return res.render('movies', { moviesAll });
            })
            .catch(error => console.log(error))
    },

    new: function (req, res, next) {

        db.Movies.findAll({
            order: [
                ['release_date', 'DESC'],
            ],
            limit: 5,
        }).then((resultado)=>{
            let newOnes = resultado;
            res.render('newOnes', {newOnes})
        })
        .catch(error => console.log(error))
    },

    ranking: function (req, res, next) {

        db.Movies.findAll({
            order: [
                ['rating', 'DESC']
            ],
            where: {
                rating:{
                    [Op.gte]: 8
                }
            }
        }) 
        .then((resultado) => {
            let topMovies = resultado
           return res.render('ranking', { topMovies})
        })
        .catch(error => console.log(error))
    },

    search: function (req, res, next) {

        let myQuery = req.query.buscar;

        db.Movies.findAll({
            where: {
                title:{
                    [Op.substring]: myQuery
                } 
            },
            order: [
                ['title', 'DESC']
            ],
        })
        .then((resultado) => { 
        let mySearch = resultado;
        return res.render('search', { mySearch})
        })
        .catch(error => console.log(error))
    },

    detail: function (req, res, next) {

        let myId = req.params.id;
        var actualUrl = url.parse(req.url, true);
        let myUrl = actualUrl.pathname;

        db.Movies.findByPk(myId, {
            include: ["genero"],
            raw: true,
            nest: true
        })
        .then((resultado) => {
                let myMovie = resultado
                return res.render('detail', {
                    myMovie,
                    myUrl
                })
            })
            .catch(error => console.log(error))

    },

    edit: function (req, res, next) {

        let myId = req.params.id;
        var actualUrl = url.parse(req.url, true);
        let myUrl = actualUrl.pathname;

        db.Movies.findOne({
                where: {
                    id: myId
                }
            }).then((resultado) => {
                let myMovie = resultado
                //ENviar datos de myMovie en los campos del Form (para ser editados)
                return res.render('edit' , {myMovie, myUrl});
            })
            .catch(error => console.log(error))

    },

    delete: function(req, res, next) {

        let myId = req.params.id;
        
        db.Movies.destroy({
                where: {
                    id: myId
                }
            })
        .then(() => {
                return res.redirect('/movies')
            })
        .catch(error => console.log(error))

    },

    save: function (req, res, next) {

        let myId = req.params.id;
        let actualUrl = url.parse(req.url, true);
        let myUrl = actualUrl.pathname;

        db.Movies.update({

            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length

        },{
            where: {
                id: myId
            }
        })
        .then(() => {
        return res.redirect('/movies');
            })
        .catch(error => console.log(error))

    },

    create: function (req, res, next) {

            var actualUrl = url.parse(req.url, true);
            let myUrl = actualUrl.pathname;

            res.render('create' , { myUrl })
    },

    submit: function (req, res, next) {

        let myId = req.params.id;
        let actualUrl = url.parse(req.url, true);
        let myUrl = actualUrl.pathname;

        db.Movies.create({

                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length

            })
            .then(() => {
                return res.redirect('/movies')})
            .catch(error => console.log(error))

    },
}

module.exports = moviesController;