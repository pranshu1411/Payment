const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const accountRouter = require('./accounts');
const notificationRouter = require('./notifications');

router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/notifications", notificationRouter);

module.exports = router;