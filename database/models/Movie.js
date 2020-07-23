module.exports = (sequelize, dataTypes) => {
    const alias = 'Movies';
    const cols = {
        title: {
            type: dataTypes.STRING,
        },
        rating: {
            type: dataTypes.DECIMAL,
        },
        awards: {
            type: dataTypes.INTEGER,
        },
        release_date: {
            type: dataTypes.DATE,
        },
        length: {
            type: dataTypes.INTEGER,
        },       

    }
    let config = {
        //tableName = 'movies',
        timestamps : false,
    }

    const Movies = sequelize.define(alias, cols, config);

    Movies.associate = (function(models){
        Movies.belongsTo(models.Generos, {
            as: "genero",
            foreignKey:"genre_id"
        })
    })
    


    return Movies;
}


//rating,   premios,   duración   y   fecha   de   estreno