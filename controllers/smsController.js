import twilio from 'twilio';
import { accountSid, authToken, phoneNumber } from '../config/twilioConfig';

const client = twilio(accountSid, authToken);

function sendSMS(to, message) {
    return client.messages.create({
        body: message,
        from: phoneNumber,
        to: to
    });
}

export default {
    sendSMS
};

// import twilioFunctions from '../utils/twilioFunctions';

// export const sendSMS = async (req, res) => {
//     const { to, message } = req.body;

//     try {
//         const response = await twilioFunctions.sendSMS(to, message);
//         res.status(200).json({ success: true, response });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };