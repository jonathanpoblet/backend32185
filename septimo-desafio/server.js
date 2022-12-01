import express from 'express';
import { randomUUID } from 'crypto';
import http from 'http';
import { Server } from 'socket.io';
import { routerProducts } from './routers/routerProducts.js';
import { PORT } from './config/config.js';
import { containerProducts } from './container/containerProducts.js';
import { containerMessages } from './container/containerMessages.js';
import { routerMessages } from './routers/routerMessages.js';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/products' , routerProducts);
app.use('/messages' , routerMessages);

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

});

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
