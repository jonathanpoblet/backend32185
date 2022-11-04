const express = require('express');
const { routerApi } = require('./routers/routerApi.js');

const app = express();
const PORT = 8080;

//middleware
app.use(express.json())

//route
app.use('/', routerApi);

//conectar al puerto 8080
const server = app.listen(PORT, () => {
    console.log(`conected to port ${PORT}`)
})




