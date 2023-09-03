import twilio from 'twilio';
import { accountSid, authToken, phoneNumber } from '../config/twilioConfig';

const client = twilio(accountSid, authToken);


export const sendOTP = async (req, res) => {
    try {
        const { receiver, otp } = req.body;

        const smsResponse = await client.messages.create({
            body: `Your The Suit Lab's verification code is ${ otp }. Only valid for 5 minutes`,
            from: phoneNumber,
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