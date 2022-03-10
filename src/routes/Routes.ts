import { Router, Response } from 'express';

const routes = Router();

routes.get('/', (_, res: Response) => res.send('Working...'));

export { routes };