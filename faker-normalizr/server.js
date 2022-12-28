import express from 'express';
import { engine } from 'express-handlebars'
import { randomUUID } from 'crypto';
import http from 'http';
import { Server } from 'socket.io';
import { PORT } from './config/config.js';
import { containerProducts } from './container/containerProducts.js';
import { containerMessages } from './container/containerMessages.js';
import { routerProducts } from './routers/routerProducts.js';
import { routerMessages } from './routers/routerMessages.js';
import { routerProductsTest } from './test/test.js'

import { createTableMessages } from './sql/tables/tableMessages.js';
import { createTableProducts } from './sql/tables/tableProducts.js';


import { normalize,schema } from "normalizr";
import util from 'util'

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

//Normalization schema
const authorSchema = new schema.Entity('author',{},{idAttribute:'email'});
const textSchema = new schema.Entity('text');

const messageSchema = new schema.Array( 
    {
        author: authorSchema,
        text: textSchema
    }
);

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
}

//? Handlebars para prueba, estableci como predeterminada la carpeta views dentro de test. Para que toda la prueba este dentro de test
app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.set('views', './test/views');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/products', routerProducts);
app.use('/messages', routerMessages);
app.use('/products-test',routerProductsTest)


io.on('connection', async(socket) => {
    const products = await containerProducts.getAll();
    socket.emit('products',products);
    
    socket.on('update', async(product) => {
        const newProduct = product;
        newProduct.id  = randomUUID();
        await containerProducts.save(newProduct);
        const products = await containerProducts.getAll();
        io.sockets.emit('products', products);
    })
    
    const messages = await containerMessages.getAll();
    console.log(JSON.stringify(messages).length)
    const normalizedData = normalize(messages,messageSchema);
    //print(normalizedData)
    //console.log(JSON.stringify(normalizedData).length)
    socket.emit('messages',normalizedData)

    socket.on('newMessage', async(message) => {
        const newMessage = message;
        await containerMessages.save(newMessage);
        const messages = await containerMessages.getAll();
        const normalizedData = normalize(messages,messageSchema)
        print(normalizedData)
        io.sockets.emit('messages', normalizedData);
    })
});

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
