import { Router } from 'express';
import { UserController } from '../controllers';

const routes = Router();

routes.get('/users', UserController.GetAll);
routes.post('/users', UserController.Create);

export { routes };