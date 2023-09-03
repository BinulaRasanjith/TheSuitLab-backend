import { Router } from 'express';
import { sendSMS, notifyFitOn, notifyCollection } from '../controllers/smsController.js'

const router = Router();

router.post('/send', sendSMS);
router.post('/fit-on', notifyFitOn);
router.post('/collection', notifyCollection);

export default router;