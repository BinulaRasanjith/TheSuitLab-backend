import { Router } from "express";

import { getNotifications, getIfUnreadNotifications, setNotificationToRead, setNotificationsToRead, deleteAllNotification } from "../controllers/notificationController.js";
import { authJWT } from "../middlewares/authUser.js";

const router = Router();

// /api/notification/
router.get("/", authJWT, getNotifications);
router.get("/unread", authJWT, getIfUnreadNotifications);
router.put("/", authJWT, setNotificationsToRead);
router.put("/read", authJWT, setNotificationToRead);
router.delete("/", authJWT, deleteAllNotification);

export default router;