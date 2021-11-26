const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogamesRoute = require('./videogamesRoute.js')
const genderroute = require('./GenderRoute.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogamesRoute);
router.use("/genres", genderroute);


module.exports = router;
