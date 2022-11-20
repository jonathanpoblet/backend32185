const express = require('express')
const { randomUUID } = require('crypto');

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const  ContainerProducts  = require('./class/container.js');
const ContainerMessages = require('./class/containerMessages.js')
const containerProducts =  new ContainerProducts("./products.txt");
const containerMessages = new ContainerMessages("./messages.txt")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

io.on('connection', async(socket) => {
    const products = await containerProducts.getAllProducts();
    socket.emit('products',products);

    socket.on('update', async(product) => {
        const newProduct = product;
        newProduct.id  = randomUUID();
        await containerProducts.save(newProduct);
        const products = await containerProducts.getAllProducts();
        io.sockets.emit('products', products);
    })

    const messages = await containerMessages.getAllMessages();
    socket.emit('messages',messages)

    socket.on('newMessage', async(message) => {
        const newMessage = message;
        newMessage.date = new Date().toLocaleString()
        newMessage.id  = randomUUID();
        await containerMessages.saveMessages(newMessage);
        const messages = await containerMessages.getAllMessages();
        io.sockets.emit('messages', messages);
    })

});


const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
