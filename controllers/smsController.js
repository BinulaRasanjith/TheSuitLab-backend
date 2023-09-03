import twilio from 'twilio';
import { setup } from '../config/twilioConfig.js';
// import { accountSid, authToken, phoneNumber } from '../config/twilioConfig.js';

const client = twilio(setup.accountSid, setup.authToken);
const twilioNumber = setup.phoneNumber;
// const client = twilio(accountSid, authToken);
// const twilioNumber = phoneNumber;

// TO USE COMMON FUNCTION FOR SENDING ALL NOTIFICATIONS
export const sendSMS = async (req, res) => {
    try {
        const { receiver, message } = req.body;

        const smsResponse = await client.messages.create({
            body: message,
            from: twilioNumber,
            to: receiver,
        });

        // SMS SENT SUCCESSFULLY
        console.log(`SMS sent to ${ receiver }: ${ smsResponse.sid }`);
        return res.status(200).json({ smsResponse: smsResponse });

    } catch (error) {
        // HANDLE ANY ERRORS THAT OCCUR DURING SMS SENDING
        console.error('Error sending SMS:', error);
        return res.status(500).json({ message: error.message }); // RETHROW THE ERROR TO HANDLE IT AT A HIGHER LEVEL IF NEEDED
    }
};

// TO SEND FIT-ON NOTIFICATION (SPECIFIC)
export const notifyFitOn = async (req, res) => {
    try {
        const { receiver } = req.body;

        const smsResponse = await client.messages.create({
            body: ` \nDear Customer, \nYour order has been completed successfully. Our store's open from Monday to Saturday, 10:00 AM to 8:00 PM, and Sunday, 11:00 AM to 6:00 PM. You can visit our store during these opening hours to fit-on your costume. \n\nThank you for choosing to shop with us! We appreciate your business. \n\nWarm regards, \nThe Suit Lab Team`,
            from: twilioNumber,
            to: receiver,
        });

        // SMS SENT SUCCESSFULLY
        console.log(`SMS sent to ${ receiver }: ${ smsResponse.sid }`);
        return res.status(200).json({ smsResponse: smsResponse });

    } catch (error) {
        // HANDLE ANY ERRORS THAT OCCUR DURING SMS SENDING
        console.error('Error sending SMS:', error);
        return res.status(500).json({ message: error.message }); // RETHROW THE ERROR TO HANDLE IT AT A HIGHER LEVEL IF NEEDED
    }
};

// TO SEND COLLECTION NOTIFICATION (SPECIFIC)
export const notifyCollection = async (req, res) => {
    try {
        const { receiver } = req.body;

        const smsResponse = await client.messages.create({
            body: ` \nDear Customer, \nYour order has been prepared and is ready for collection. Our store's open from Monday to Saturday, 10:00 AM to 8:00 PM, and Sunday, 11:00 AM to 6:00 PM. You can visit our store during these opening hours to collect your order. \n\nThank you for choosing to shop with us! We appreciate your business. \n\nWarm regards, \nThe Suit Lab Team`,
            from: twilioNumber,
            to: receiver,
        });

        // SMS SENT SUCCESSFULLY
        console.log(`SMS sent to ${ receiver }: ${ smsResponse.sid }`);
        return res.status(200).json({ smsResponse: smsResponse });

    } catch (error) {
        // HANDLE ANY ERRORS THAT OCCUR DURING SMS SENDING
        console.error('Error sending SMS:', error);
        return res.status(500).json({ message: error.message }); // RETHROW THE ERROR TO HANDLE IT AT A HIGHER LEVEL IF NEEDED
    }
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