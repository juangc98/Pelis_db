module.exports = (sequelize, dataTypes) => {
    const alias = 'Generos';
    const cols = {
        name: {
            type: dataTypes.STRING(100),
        },
        ranking: {
            type: dataTypes.INTEGER,
        },
        active: {
            type: dataTypes.TINYINT,
        },
    }
    let config = {
        tableName: 'genres',
        timestamps : false,
    }

    const Generos = sequelize.define(alias, cols, config);

    Generos.associate = (function (models) {
        Generos.hasMany(models.Movies, {
            as: "movies",
            foreignKey: "genre_id"
        })
    })

    return Generos;
}
