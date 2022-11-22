import { Router } from 'express';

import { ClientController, PetController} from '../app/controllers';
import { AuthController } from '../app/controllers/AuthController';
import { UserController } from '../app/controllers/UserController';
import { ClientValidate, PetValidate, UserValidate } from '../app/Middlewares/';
import {  authMiddleware } from '../app/Middlewares/Auth';

const routes = Router();

routes.get('/clientes', authMiddleware, ClientController.getAll)
routes.get('/clientes/:id', authMiddleware, ClientController.getById)
routes.post('/clientes', authMiddleware, ClientValidate.create, ClientController.create)
routes.put('/clientes/:id', authMiddleware, ClientValidate.create, ClientController.updateById)
routes.delete('/clientes/:id', authMiddleware, ClientController.deleteById)

routes.get('/pets', authMiddleware, PetController.getAll)
routes.get('/pets/:id', authMiddleware, PetController.getById)
routes.post('/pets', authMiddleware, PetValidate.create, PetController.create)
routes.put('/pets/:id', authMiddleware, PetValidate.create, PetController.updateById)
routes.delete('/pets/:id', authMiddleware, PetController.deleteById)

routes.get('/users', authMiddleware, UserController.getAll);
routes.get('/users/:id', authMiddleware, UserController.getById);

routes.post('/login', AuthController.login);
routes.post('/register', UserValidate.create, AuthController.register);

export { routes };                            