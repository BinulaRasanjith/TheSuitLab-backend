import { Router } from 'express';
import { sendSMS } from '../controllers/smsController';

const router = Router();

router.post('/send-sms', sendSMS);

export default router;