import { Router } from 'express';
import * as turmaController from '../controllers/turmaController';

const router = Router();

router.get('/', turmaController.getTurmas);

export default router;
