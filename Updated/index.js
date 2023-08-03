const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./controllers/swagger/crud.json')
const port = 5000

//////connect db file
require("./db/config")
///// Importing Routes
var indexRouter = require("./routes/index")
/////using routes in the server
app.use(
  indexRouter
);

// Welcome message route
app.get('/', (req, res) => {
  res.send('Hi!!! Welcome'); 
});

///// conncting swagger

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
  console.log(`http://localhost:${port}`)
})