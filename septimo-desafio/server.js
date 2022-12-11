import express from 'express';
import { randomUUID } from 'crypto';
import http from 'http';
import { Server } from 'socket.io';
import { PORT } from './config/config.js';
import { containerProducts } from './container/containerProducts.js';
import { containerMessages } from './container/containerMessages.js';
import { routerProducts } from './routers/routerProducts.js';
import { routerMessages } from './routers/routerMessages.js';

import { createTableMessages } from './sql/tables/tableMessages.js';
import { createTableProducts } from './sql/tables/tableProducts.js';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

//CREACIÓN DE TABLAS
//await createTableMessages();
//await createTableProducts();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/products', routerProducts);
app.use('/messages', routerMessages);


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
    socket.emit('messages',messages)
    
    socket.on('newMessage', async(message) => {
        const newMessage = message;
        newMessage.date = new Date().toLocaleString()
        newMessage.id  = randomUUID();
        await containerMessages.save(newMessage);
        const messages = await containerMessages.getAll();
        io.sockets.emit('messages', messages);
    })
    
    // SAVE 
    // await containerProducts.save(product);
    // GET ALL
    // await containerProducts.getAll()
    // GET BY ID
    // await containerProducts.getById("0b8e8b6c-1244-4e67-844c-12c6487a");
    // UPDATE BY ID
    // await containerProducts.updateById("a533f398-b59d-4792-877e-face2107a055", {name: 'Producto 1'})
    // DELETE BY ID
    // await containerProducts.deleteById("0b8e8b6c-1244-4e67-844c-12e8b3c6487a");
    // DELETE ALL
    // await containerProducts.deleteAll();
});

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
