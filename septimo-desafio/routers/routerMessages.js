import { Router } from 'express';

import { controllerPostMessages, controllerGetMessages } from '../controllers/controllerMessages.js';

export const routerMessages = Router();

routerMessages.post('/', controllerPostMessages);

routerMessages.get('/', controllerGetMessages);