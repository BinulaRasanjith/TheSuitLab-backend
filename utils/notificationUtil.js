import { Notification } from '../models/models.js';

export const sendNotification = async (userId, subject, message, isRead) => {
    const notification = await Notification.create({
        userId,
        subject,
        message,
        isRead,
    });
    return notification;
};