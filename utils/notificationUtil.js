import { Notification } from '../models/models.js';

export const sendNotification = async (userId, subject, message) => {
    const notification = await Notification.create({
        userId,
        subject,
        message,
    });

    return notification;
};