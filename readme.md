## Pasos para usar sequelize.
1. Instalar sequelize-cli global: `sudo npm install sequelize-cli -g`
2. Crear un proyecto en node con ejs.
3. Crear el archivo `.sequelizerc` en la raíz del proyecto.
```
const path = require('path');

module.exports = {
  config:            path.resolve('./database/config', 'config.js'),
  'models-path':     path.resolve('./database/models'),
  'seeders-path':    path.resolve('./database/seeders'),
  'migrations-path': path.resolve('./database/migrations'),
}
```
4. Instalar squelize a nivel proyecto: `npm install sequelize --save`
5. Instalar el driver para mySQL a nivel proyecto: `npm install mysql2` (el driver para gesitonar una db de tipo mysql).
6. Correr `sequelize init`. Podemos hacerlo porque tenemos instalado sequelize-cli y el archivo 
7. `module.exports` del archivo `database/config/config.js`
8. Cargar las configuraciones de acceso a la db en `database/config/config.js`
9. En el controlador llamar a `const db = require('../database/models/index.js')` y `const sequelize = db.sequelize`
10. Raw query: dentro del método en donde necesitemos traer datos usamos `sequelize.query()` y dentro del lso paréntisis colocamos la sentencia SQL pura. Ej: 'SELECT * FROM movies';
11. Pasamos los datos a la vista con `return res.render('vista', { datos: data });`


## Usando modelos