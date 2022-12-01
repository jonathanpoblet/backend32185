import { randomUUID } from 'crypto';
import { containerMessages } from '../container/containerMessages.js';

export async function controllerPostMessages (req,res) {
    const newMessage = req.body;
    newMessage.id = randomUUID();
    await containerMessages.save(newMessage);
    res.json(newMessage);
}

export async function controllerGetMessages (req,res) {
    const allProducts = await containerMessages.getAll();
    res.json(allProducts)
}