import { randomUUID } from 'crypto';
import { containerMessages } from '../container/containerMessages.js';

export async function controllerPostMessages (req,res) {
    const newMessage = req.body;
    newMessage.id = randomUUID();
    await containerMessages.save(newMessage);
    res.json(newMessage);
}

export async function controllerGetMessages (req,res) {
    const allMessages = await containerMessages.getAll();
    res.json(allMessages)
}

export async function controllerGetMessageById({ params: { id } }, res) {
    const found = await containerMessages.getById(id);
    if (!found) {
        res.status(404);
        res.json({ error: `Product with id ${id} not found`});
    }
    else{
        res.json(found)
    }   
}

export async function controllerPutMessageById({body, params: { id }, res}){
    const product = await containerMessages.getById(id);
    if(!product) {
        res.status(404);
        res.json({ error: `Product with id ${id} not found`});
    }
    else{
        const newProduct = await containerMessages.updateById(id,body);
        res.json(newProduct);
    }

}

export async function controllerDeleteMessageById({ params: { id } }, res){
    const deleteProduct = await containerMessages.deleteById(id);
    if(!deleteProduct) {
        res.status(404);
        res.json({ error: `Product with id ${id} not found`})
    }
    else{
        res.json(deleteProduct);
    }
}

export async function controllerDeleteMessages (req, res) {
    const all = await containerMessages.getAll();
    if(all.length == 0){
        res.status(404);
        res.json({ error: `Not products found`})
    } else {
        console.log(all)
        await containerMessages.deleteAll();
        res.json(all);
    }
}