import { Router } from 'express';

import { UserController, AuthController, LinksController } from '../app/controllers';
import {auth, authMiddleware} from '../app/Middlewares';

const routes = Router();

routes.get('/user', authMiddleware, UserController.getData);
routes.get('/users', authMiddleware, UserController.getAll);
routes.get('/users/:id', authMiddleware, UserController.getById);
routes.put('/users/', authMiddleware, UserController.updateById);
routes.put('/users/:id', authMiddleware, UserController.updateById);
routes.delete('/users/:id', authMiddleware, UserController.deleteById);

routes.post('/login', AuthController.login);
routes.post('/register', auth.registerValidation, AuthController.register);

routes.get('/links', authMiddleware, LinksController.getAll);

routes.get('/@/:username', UserController.getProfilePublicData);

export { routes };                            