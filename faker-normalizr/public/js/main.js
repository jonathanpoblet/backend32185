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
        author: {
            email: formAddMessage[0].value,
            name: formAddMessage[1].value,
            surname: formAddMessage[2].value,
            age: formAddMessage[3].value,
            nickname: formAddMessage[4].value,
            avatar: formAddMessage[5].value,
            date: new Date().toLocaleString()
        },
        text: formAddMessage[6].value
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

const authorSchema = new normalizr.schema.Entity('authors',{},{idAttribute:'email'});
const textSchema = new normalizr.schema.Entity('messages', {author: authorSchema} , {idAttribute:'_id'});

const messageSchema = new normalizr.schema.Array( 
    textSchema
);

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
}

async function eventHandlerMessages(messages) {
    const denormalizedMessages = normalizr.denormalize(messages.result, messageSchema,messages.entities);
    
    const normalizedMessagesLength = (JSON.stringify(messages).length);

    const denormalizedMessagesLength = (JSON.stringify(denormalizedMessages).length);
    console.log(`Denormalized message: ${denormalizedMessagesLength}`);
    console.log(`Normalized message: ${normalizedMessagesLength}`);
    console.log(`Percentage : ${((normalizedMessagesLength * 100) / denormalizedMessagesLength) - 100} %`);

    const template = await fetch('templates/messages.hbs')

    const templateText = await template.text()

    const functionTemplate = Handlebars.compile(templateText)

    const html = functionTemplate({ denormalizedMessages })

    document.getElementById('messages').innerHTML = html
}