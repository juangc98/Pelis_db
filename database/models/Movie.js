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
    const config = {
        // tableName = 'movies'
        timestamps : true,
    }

    const Movie = sequelize.define(alias, cols, config);


    return Movie;
}


//rating,   premios,   duración   y   fecha   de   estreno