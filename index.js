const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const config = require('./config/keys');


app.use(bodyParser.json());

require('./routes/dialogFlowRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT); 

