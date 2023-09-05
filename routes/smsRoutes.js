import { Router } from 'express';
import { sendSMS, notifyFitOn, notifyCollection } from '../controllers/smsController.js'

const router = Router();

router.post('/send', sendSMS); // TO USE COMMON FUNCTION FOR SENDING ALL NOTIFICATIONS
router.post('/fit-on', notifyFitOn); // TO SEND FIT-ON NOTIFICATION (SPECIFIC)
router.post('/collection', notifyCollection); // TO SEND COLLECTION NOTIFICATION (SPECIFIC)

export default router;