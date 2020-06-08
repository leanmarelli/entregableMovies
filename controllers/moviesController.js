let db = require('../database/models/index.js');
const sequelize = db.sequelize;
const Movie = db.Movie

let moviesController = {
    list: function (req, res) {
        Movie.findAll()
            .then(function (result) {
                return res.render('movies', { result });
            })

            .catch(error => console.log(error))

    },

    detail: function (req, res) {
        Movie.findByPk(req.params.id)
            .then(function (result) {
                return res.render('moviesDetail', { result });
            })

            .catch(error => console.log(error))
    },

    new: function (req, res) {
        Movie.findAll({
            order: [
                ['releaseDate', 'DESC']
            ],
            limit: 5
        }).then(function (result) {
            return res.render('moviesNew', { result })
        })

            .catch(error => console.log(error))
    },

    recommended: function (req, res) {
        Movie.findAll({
            where: {
                rating: { [db.Sequelize.Op.gte]: 8 }
            },
            order: [
                ['rating', 'DESC']
            ],

        }).then(function (result) {
            return res.render('moviesRecommended', { result })
        })

            .catch(error => console.log(error))
    },

    search: function (req, res) {
        Movie.findAll({
            where: {
                title: { [db.Sequelize.Op.like]: "%" + req.body.buscador + "%" }
            },
            order: [
                [req.body.filtrar, 'DESC']]

        })
            .then(function (result) {
                return res.render('search', { result })
            })
    },
}

module.exports = moviesController;