const express = require('express');
const { userMiddleware } = require('../middleware/userAuth');
const { User, Account, Transaction, Notification } = require('../db/db');
const mongoose = require('mongoose');

const router = express.Router();

router.get("/balance", userMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.status(200).json({
            balance: account.balance
        });

    } catch (err) {
        console.error("Error fetching balance:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/transfer", userMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { amount, to } = req.body;

        const senderAccount = await Account.findOne({ userId: req.userId }).session(session);
        if (!senderAccount || senderAccount.balance < amount) {
            await session.abortTransaction();

            await Transaction.create({
                fromAccount: senderAccount._id,
                toAccount: to,
                amount,
                status: "failed"
            });

            return res.status(400).json({ message: "Insufficient balance" });
        }

        const recipient = await User.findById(to);
        if (!recipient) {
            await session.abortTransaction();

            await Transaction.create({
                fromAccount: senderAccount._id,
                toAccount: to,
                amount,
                status: "failed"
            });

            return res.status(400).json({ message: "Recipient not found" });
        }
        
        const toAccount = await Account.findOne({ userId: recipient._id }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Recipient account not found" });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: recipient._id }, { $inc: { balance: amount } }).session(session);

        const txn = new Transaction({
            fromAccount: senderAccount._id,
            toAccount: toAccount._id,
            amount,
            status: "success"
        });
        await txn.save({ session });

        const sender = await User.findById(req.userId).session(session);
        const notification = new Notification({
            userId: recipient._id,
            message: `You received ₹${amount} from ${sender.firstName} ${sender.lastName}`
        });
        await notification.save({ session });

        await session.commitTransaction();
        res.json({ message: "Transfer successful" });
    } catch (e) {
        await session.abortTransaction();
        console.error(e);

        if (req.userId) {
            await Transaction.create({
                fromAccount: req.userId,
                toAccount: req.body.to,
                amount: req.body.amount,
                status: "failed"
            });
        }

        res.status(500).json({ message: "Internal server error" });
    } finally {
        session.endSession();
    }
});


router.get("/history", userMiddleware, async (req, res) => {
    try {
        const userAccount = await Account.findOne({ userId: req.userId });
        if (!userAccount) {
            return res.status(404).json({ message: "Account not found" });
        }

        const transactions = await Transaction.find({
            $or: [{ fromAccount: userAccount._id }, { toAccount: userAccount._id }]
        })
        .populate({
            path: 'fromAccount',
            populate: {
                path: 'userId',
                select: 'firstName lastName username'
            }
        })
        .populate({
            path: 'toAccount',
            populate: {
                path: 'userId',
                select: 'firstName lastName username'
            }
        })
        .sort({ createdAt: -1 });

        const history = transactions.map(t => {
            let isSender = false;
            let counterparty = null;

            if (t.fromAccount && t.fromAccount._id.toString() === userAccount._id.toString()) {
                isSender = true;
                counterparty = t.toAccount ? t.toAccount.userId : null;
            } else if (t.toAccount && t.toAccount._id.toString() === userAccount._id.toString()) {
                isSender = false;
                counterparty = t.fromAccount ? t.fromAccount.userId : null;
            } else if (!t.fromAccount) {
                // If fromAccount is deleted, we must be the recipient
                isSender = false;
            } else if (!t.toAccount) {
                // If toAccount is deleted, we must be the sender
                isSender = true;
            }

            return {
                id: t.transactionId,
                type: isSender ? 'sent' : 'received',
                amount: t.amount,
                status: t.status,
                date: t.createdAt,
                counterparty: counterparty ? {
                    firstName: counterparty.firstName,
                    lastName: counterparty.lastName,
                    username: counterparty.username
                } : {
                    firstName: "Deleted",
                    lastName: "User",
                    username: "deleted_user"
                }
            };
        });

        res.status(200).json(history);
    } catch (err) {
        console.error("Error fetching history:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
