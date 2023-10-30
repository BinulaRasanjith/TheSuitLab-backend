import twilio from 'twilio';
import { setup } from '../config/twilioConfig.js';

const client = twilio(setup.accountSid, setup.authToken);
const twilioNumber = setup.phoneNumber;

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
export const notifyFitOn = async (receiver) => {
    try {
        // SEND FIT-ON NOTIFICATION TO THE CUSTOMER
        const smsResponse = await client.messages.create({
            body: ` \nDear Customer, \nYour order has been completed successfully. Our store's open from Monday to Saturday, 10:00 AM to 8:00 PM, and Sunday, 11:00 AM to 6:00 PM. You can visit our store during these opening hours to fit-on your costume. \n\nThank you for choosing to shop with us! We appreciate your business. \n\nWarm regards, \nThe Suit Lab Team`,
            from: twilioNumber,
            to: receiver,
        });

        // SMS SENT SUCCESSFULLY
        console.log(`SMS sent to ${ receiver }: ${ smsResponse.sid }`);
        return smsResponse;

    } catch (error) {
        // HANDLE ANY ERRORS THAT OCCUR DURING SMS SENDING
        console.error('Error sending SMS:', error);
        return error.message; // RETHROW THE ERROR TO HANDLE IT AT A HIGHER LEVEL IF NEEDED
    }
};

// TO SEND COLLECTION NOTIFICATION (SPECIFIC)
export const notifyCollection = async (receiver) => {
    try {
        // SEND COLLECTION NOTIFICATION TO THE CUSTOMER
        const smsResponse = await client.messages.create({
            body: ` \nDear Customer, \nYour order has been prepared and is ready for collection. Our store's open from Monday to Saturday, 10:00 AM to 8:00 PM, and Sunday, 11:00 AM to 6:00 PM. You can visit our store during these opening hours to collect your order. \n\nThank you for choosing to shop with us! We appreciate your business. \n\nWarm regards, \nThe Suit Lab Team`,
            from: twilioNumber,
            to: receiver,
        });

        // SMS SENT SUCCESSFULLY
        console.log(`SMS sent to ${ receiver }: ${ smsResponse.sid }`);
        return smsResponse;

    } catch (error) {
        // HANDLE ANY ERRORS THAT OCCUR DURING SMS SENDING
        console.error('Error sending SMS:', error);
        return error.message; // RETHROW THE ERROR TO HANDLE IT AT A HIGHER LEVEL IF NEEDED
    }
};

// SEND CUSTOMER AUTHENTICATION DETAILS WHEN ADDED BY OPERATION ASSISTANT // ! CONNCTED TO USER CONTROLLER
export const sendAuthDetails = async (receiver) => {
    try {
        //SEND SMS TO CUSTOMER WITH LOGIN DETAILS
        const smsResponse = await client.messages.create({
            body: `Welcome to the Suit Labs! Your login details are as follows: \n\nUsername: ${ receiver } \nPassword: ${ receiver } \n\nPlease change your password after logging in. \n\nThank you for choosing to shop with us! We appreciate your business. \n\nWarm regards, \nThe Suit Lab Team`,
            from: twilioNumber,
            to: receiver,
        });

        // SMS SENT SUCCESSFULLY
        console.log(`SMS sent to ${ receiver }: ${ smsResponse.sid }`);
        return smsResponse; // RETURN SMS RESPONSE TO USER CONTROLLER

    } catch (error) {
        // HANDLE ANY ERRORS THAT OCCUR DURING SMS SENDING
        console.error('Error sending SMS:', error);
        return error.message;  // RETURN ERROR RESPONSE TO USER CONTROLLER
    }
};