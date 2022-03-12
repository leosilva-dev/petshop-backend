import { Router } from 'express';
import { UserController } from '../controllers';

const routes = Router();

routes.get('/users', UserController.getAll);
routes.get('/users/:id', UserController.getById);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.updateById);
routes.delete('/users/:id', UserController.deleteById);

export { routes };                            