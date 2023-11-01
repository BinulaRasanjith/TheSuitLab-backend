import { Router } from "express";

import { getNotifications, setNotificationToRead, setNotificationsToRead } from "../controllers/notificationController.js";

const router = Router();

// /api/notification/
router.get("/", getNotifications);
router.put("/", setNotificationsToRead);
router.put("/read", setNotificationToRead);

export default router;