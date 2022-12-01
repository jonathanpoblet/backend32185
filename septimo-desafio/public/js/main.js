const socket = io();

const formAddProduct = document.getElementById('formAddProduct');
formAddProduct.addEventListener('submit', e => {
    e.preventDefault();

    const product = {
        name: formAddProduct[0].value,
        description: formAddProduct[1].value,
        image: formAddProduct[2].value,
        price: formAddProduct[3].value,
    }
    socket.emit('update', product);

    formAddProduct.reset();
})

const formAddMessage = document.getElementById('formAddMessage');
formAddMessage.addEventListener('submit', e => {
    e.preventDefault();

    const message = {
        email: formAddMessage[0].value,
        message: formAddMessage[1].value,
    }

    socket.emit('newMessage', message);

    formAddMessage.reset();
})

socket.on('products', eventHandlerProducts);
socket.on('messages', eventHandlerMessages);

async function eventHandlerProducts(products) {

    const template = await fetch('templates/products.hbs')

    const templateText = await template.text()

    const functionTemplate = Handlebars.compile(templateText)

    const html = functionTemplate({ products })

    document.getElementById('products').innerHTML = html
}

async function eventHandlerMessages(messages) {

    const template = await fetch('templates/messages.hbs')

    const templateText = await template.text()

    const functionTemplate = Handlebars.compile(templateText)

    const html = functionTemplate({ messages })

    document.getElementById('messages').innerHTML = html
}