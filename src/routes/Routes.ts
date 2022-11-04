import { Router } from 'express';

import { ClientController, PetController} from '../app/controllers';
import { ClientValidate, PetValidate } from '../app/Middlewares/';

const routes = Router();

routes.get('/clientes', ClientController.getAll)
routes.get('/clientes/:id', ClientController.getById)
routes.post('/clientes', ClientValidate.create, ClientController.create)
routes.put('/clientes/:id', ClientValidate.create, ClientController.updateById)
routes.delete('/clientes/:id', ClientController.deleteById)

routes.get('/pets', PetController.getAll)
routes.get('/pets/:id', PetController.getById)
routes.post('/pets', PetValidate.create, PetController.create)
routes.put('/pets/:id', PetValidate.create, PetController.updateById)
routes.delete('/pets/:id', PetController.deleteById)

export { routes };                            