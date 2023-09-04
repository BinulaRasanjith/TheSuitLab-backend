import twilio from 'twilio';
import { accountSid, authToken, phoneNumber } from '../config/twilioConfig.js';

const client = twilio(accountSid, authToken);
const twilioNumber = phoneNumber;

export const sendOTP = async (req, res) => {
    try {
        // GET RECEIVER AND OTP FROM REQUEST BODY
        const { receiver, otp } = req.body;

        const smsResponse = await client.messages.create({
            body: `Your The Suit Lab's verification code is ${ otp }. Only valid for 5 minutes`,
            from: twilioNumber,
            to: receiver,
        });

        // OTP SENT SUCCESSFULLY
        console.log(`SMS sent to ${ receiver }: ${ smsResponse.sid }`);
        return res.status(200).json({ smsResponse: smsResponse });

    } catch (error) {
        // HANDLE ANY ERRORS THAT OCCUR DURING SMS SENDING
        console.error('Error sending SMS:', error);
        return res.status(500).json({ message: error.message }); // SEND ERROR RESPONSE
    }
};