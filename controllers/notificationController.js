import { Notification } from "../models/models.js";

export const getNotifications = async (req, res) => {
    const { userId } = req.user;

    try {
        const notifications = await Notification.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(notifications);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const setNotificationToRead = async (req, res) => {
    const { id } = req.body;

    try {
        const notification = await Notification.findByPk(id);

        if (notification) {
            notification.isRead = true;
            await notification.save();

            res.status(200).json({ notification });
        } else {
            res.status(404).json({ message: "Notification not found" });
        }
    } catch (error) {
        console.log(error);
    }
};

export const setNotificationsToRead = async (req, res) => {
    const { userId } = req.user;

    try {
        await Notification.update(
            { isRead: true },
            { where: { userId, isRead: false } }
        );
        res.status(200).json({ message: "Notifications set to read" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
