const { Router } = require('express')

const route = Router();

const { getGender } = require('../Controllers/GenderController.js');

route.get('/',getGender);

module.exports= route