const db = require('../database/models/index'); //traemos la variable db
const sequelize = db.sequelize; //traemos solo la porpiedad que nos sirve.
const Movies = require('../database/models/Movie');
const Op = db.Sequelize.Op;

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

    detail : function(req, res, next) {

        let myId = req.params.id;
        
        db.Movies.findOne({
            where: {
                id: myId
            }
        }).then((resultado) => {
            let myMovie = resultado
            res.render('detail', { myMovie })
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
    }
}

module.exports = moviesController;