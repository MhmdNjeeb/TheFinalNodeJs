const express = require('express');
const port = 7575;
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.use(express.static(join(__dirname, 'public')));

const fe = require('./FE_R');
const {join} = require("node:path");
app.use('/', fe);

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port http://localhost:${port}`);
});
