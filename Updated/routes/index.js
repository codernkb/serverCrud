var express = require('express');
var route = express.Router();

// Importing controllers
const masterControllers = require("../controllers/index")

// Routes

route.post('/create', masterControllers.create);
route.post('/fetchAll', masterControllers.fetchAll);
route.post('/delete', masterControllers.delete);
route.post('/getDetailsById', masterControllers.getDetailsById);
route.post('/updateById', masterControllers.updateById);

module.exports = route;

