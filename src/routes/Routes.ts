import { Router } from 'express';

import { UserController, AuthController, LinksController } from '../app/controllers';
import {auth, authMiddleware} from '../app/Middlewares';

const routes = Router();

routes.get('/users', UserController.getAll);
routes.get('/users/:id', UserController.getById);
routes.put('/users/:id', UserController.updateById);
routes.delete('/users/:id', UserController.deleteById);

routes.post('/login', AuthController.login);
routes.post('/register', auth.registerValidation, AuthController.register);

routes.get('/hello', authMiddleware, (req, res) => {
    return res.json({ msg: 'Hello!!!' });
});

export { routes };                            