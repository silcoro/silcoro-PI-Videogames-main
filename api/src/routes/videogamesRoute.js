const { Router } = require('express');

const { getvideogames, videogamesId,postvideogames } = require('../Controllers/VideogameController.js')

const route = Router();


route.get('/', getvideogames);
route.get('/:idVideoGames', videogamesId);
route.post('/',postvideogames)


module.exports = route;