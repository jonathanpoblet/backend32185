import { Router } from 'express';

import { controllerPostMessages,
     controllerGetMessages,
     controllerGetMessageById,
     controllerPutMessageById,
     controllerDeleteMessageById,
     controllerDeleteMessages
    } from '../controllers/controllerMessages.js';

export const routerMessages = Router();

routerMessages.post('/', controllerPostMessages);
routerMessages.get('/', controllerGetMessages);
routerMessages.get('/:id', controllerGetMessageById);
routerMessages.put('/:id', controllerPutMessageById);
routerMessages.delete('/:id', controllerDeleteMessageById);
routerMessages.delete('/', controllerDeleteMessages);