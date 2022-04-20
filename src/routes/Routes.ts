import { Router } from 'express';
import { UserController } from '../controllers';
import { AuthController } from '../controllers/AuthController';
import {auth} from '../Middlewares/auth/registerUser';

const routes = Router();

routes.get('/users', UserController.getAll);
routes.get('/users/:id', UserController.getById);
routes.put('/users/:id', UserController.updateById);
routes.delete('/users/:id', UserController.deleteById);

routes.post('/login', AuthController.login);
routes.post('/register', auth.registerValidation, AuthController.register);

export { routes };                            