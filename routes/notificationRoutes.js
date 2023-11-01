import { Router } from "express";

import { getNotifications, setNotificationToRead, setNotificationsToRead, deleteAllNotification } from "../controllers/notificationController.js";
import { authJWT } from "../middlewares/authUser.js";

const router = Router();

// /api/notification/
router.get("/", authJWT, getNotifications);
router.put("/", authJWT, setNotificationsToRead);
router.put("/read", authJWT, setNotificationToRead);
router.delete("/", authJWT, deleteAllNotification);

export default router;