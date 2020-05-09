import { Router } from 'express';

const routes = Router();

import PDFController from './app/controllers/PDFController';

routes.post('/write', PDFController.store);

export default routes;