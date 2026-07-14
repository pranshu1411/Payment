const express = require('express');
const { userMiddleware } = require('../middleware/userAuth');
const { Notification } = require('../db/db');

const router = express.Router();

router.get("/", userMiddleware, async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (err) {
        console.error("Error fetching notifications:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/read", userMiddleware, async (req, res) => {
    try {
        await Notification.updateMany(
            { userId: req.userId, isRead: false },
            { $set: { isRead: true } }
        );
        res.status(200).json({ message: "Notifications marked as read" });
    } catch (err) {
        console.error("Error updating notifications:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
