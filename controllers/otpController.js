import twilio from 'twilio';
import speakeasy from 'speakeasy';
import Redis from 'ioredis'; // IMPORT THE IOREDIS LIBRARY

import { setup } from '../config/twilioConfig.js';

const client = twilio(setup.accountSid, setup.authToken);
const twilioNumber = setup.phoneNumber;

// CREATE A REDIS CLIENT INSTANCE
const redis = new Redis();

export const sendOTP = async (req, res) => {
    try {
        // GET RECEIVER AND OTP FROM REQUEST BODY
        const { mobileNo } = req.body;

        // GENERATE OTP
        const otp = speakeasy.totp({
            secret: speakeasy.generateSecret({ length: 20 }).base32,
            digits: 6,
            window: 5,
            step: 60,
        });

        // STORE THE OTP IN REDIS WITH AN EXPIRATION TIME (300 -> 5 MINUTES)
        await redis.set(`otp:${mobileNo}`, otp, 'EX', 300);

        const smsResponse = await client.messages.create({
            body: `Your The Suit Lab's verification code is ${otp}. Only valid for 5 minutes`,
            from: twilioNumber,
            to: mobileNo,
        });
        // CHECK smsResponse.status FOR SUCCESS OR FAILURE
        const { status, receiver } = smsResponse;

        if (status !== 'accepted') {
            console.error(`SMS to ${receiver} failed with status: ${status}`);
            return res.status(500).json({ message: 'Error sending OTP' }); // SEND ERROR RESPONSE
        } else if (status === 'accepted') {
            console.log(`SMS to ${receiver} was sent successfully.\nOTP: ${otp}`);
            return res.status(200).json({ message: 'OTP sent successfully' }); // SEND SUCCESS RESPONSE
        }
    } catch (error) {
        // HANDLE ANY ERRORS THAT OCCUR DURING SMS SENDING
        console.error('Error sending SMS:', error);
        return res.status(500).json({ message: error.message }); // SEND ERROR RESPONSE
    }
};

export const verifyOTP = async (req, res) => {
    try {
        // GET RECEIVER AND OTP FROM REQUEST BODY
        const { mobileNo, otp } = req.body;

        // RETRIEVE THE STORED OTP FROM REDIS
        const storedOTP = await redis.get(`otp:${mobileNo}`);
        const userInputOTP = otp;

        // COMPARE THE STORED OTP WITH THE USER'S INPUT
        if (storedOTP != userInputOTP) {
            console.error('Invalid OTP');
            return res.status(401).json({ message: 'Invalid OTP' }); // SEND ERROR RESPONSE
        }

        // SEND SUCCESS RESPONSE
        console.log('OTP verified successfully');
        return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        // HANDLE ANY ERRORS THAT OCCUR DURING OTP VERIFICATION
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: error.message }); // SEND ERROR RESPONSE
    }
};