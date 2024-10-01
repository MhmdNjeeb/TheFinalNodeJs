const express = require('express');
const port = 7575;
const app = express();
const path = require('path');
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

const db_M = require('./database');
global.db_pool = db_M.pool;

const fe = require('./FE_R');
app.use('/', fe);

const pointsRoutes = require('./js/Points_Sripts');
app.use('/points', pointsRoutes);

const visitsRoutes = require('./js/Visits_Scripts');
app.use('/visits', visitsRoutes);

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port http://localhost:${port}`);
});
