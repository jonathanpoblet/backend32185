const express = require('express');
const { engine } = require('express-handlebars')
const { routerApi } = require('./routers/routerApi.js');

const app = express();
const PORT = 8080;

//middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

//route
app.use('/products', routerApi);

//conectar al puerto 8080
const server = app.listen(PORT, () => {
    console.log(`conected to port ${PORT}`);
})




