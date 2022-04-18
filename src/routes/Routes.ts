import { Router } from 'express';
import { UserController } from '../controllers';
import { AuthController } from '../controllers/AuthController';
import {UsersValidade} from '../Middlewares/Users/UserValidateCreate'

const routes = Router();

routes.get('/users', UserController.getAll);
routes.get('/users/:id', UserController.getById);
routes.post('/users', UsersValidade.create, UserController.create);
routes.put('/users/:id', UserController.updateById);
routes.delete('/users/:id', UserController.deleteById);

routes.post('/login', AuthController.login);

export { routes };                            