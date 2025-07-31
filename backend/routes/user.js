const express = require('express');
const zod = require('zod');
const router = express.Router();
const { User, Account } = require('../db/db');
const { generateToken, hashPassword, verifyPassword } = require('../utils/auth');
const { userMiddleware } = require('../middleware/userAuth');

const signupSchema = zod.object({
    emailId: zod.string().email(),
    username: zod.string().min(3).max(20),
    password: zod.string().min(8).max(20),
    firstName: zod.string().min(3).max(50),
    lastName: zod.string().min(3).max(50)
});

const updatePersonalSchema = zod.object({
    username: zod.string().min(3).max(20).optional(),
    firstName: zod.string().min(3).max(50).optional(),
    lastName: zod.string().min(3).max(50).optional()
}).refine(data => data.username || data.firstName || data.lastName, {
    message: "At least one field is required"
});

const updatePasswordSchema = zod.object({
    password: zod.string().min(8).max(20),
});

const signinBody = zod.object({
    emailId: zod.string().email(),
    password: zod.string()
});


router.post('/signup', async (req, res) => {
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if(!success){
        return res.status(400).json({ message: "Invalid input data" });
    }
    const user = await User.findOne({
        username: body.username,
    });

    if(user){
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(body.password);

    const newUser = await User.create({
        emailId: body.emailId,
        username: body.username,
        password: hashedPassword,
        firstName: body.firstName,
        lastName: body.lastName
    });

    if(!newUser){
        return res.status(500).json({ message: "Error creating user" });
    }
    const userId = newUser._id;
    await Account.create({
        userId: userId,
        balance: 1000 // Default balance
    });

    const token = generateToken(userId);
    if(!token){
        return res.status(500).json({ message: "Error generating token" });
    }
    res.status(201).json({ 
        message: "User created successfully",
        token: token,
    });
});


router.post('/signin', async (req, res) => {
    const result = signinBody.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: "Invalid email or password format" });
    }

    const { emailId, password } = result.data;

    try {
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await verifyPassword(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: "Login successful",
            token: token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.put('/update/personal', userMiddleware, async (req, res) => {
    const body = req.body;
    const { success } = updatePersonalSchema.safeParse(body);

    if (!success) {
        return res.status(411).json({
            message: "Unable to update user, invalid input data"
        });
    }

    if (body.username) {
        const existingUser = await User.findOne({
            username: body.username,
            _id: { $ne: req.userId }
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Username already in use"
            });
        }
    }

    const updateObj = {};
    if (body.username) updateObj.username = body.username;
    if (body.firstName) updateObj.firstName = body.firstName;
    if (body.lastName) updateObj.lastName = body.lastName;

    await User.updateOne(
        { _id: req.userId },
        { $set: updateObj }
    );

    res.status(200).json({
        message: "User updated successfully"
    });
});


router.put('/update/password', userMiddleware, async (req, res) => {
    const body = req.body;
    const { success } = updatePasswordSchema.safeParse(body);

    if (!success) {
        return res.status(411).json({
            message: "Unable to update password, invalid input data"
        });
    }

    const updateObj = {};
    if (body.password) updateObj.password = await hashPassword(body.password);

    await User.updateOne(
        { _id: req.userId },
        { $set: updateObj }
    );

    res.status(200).json({
        message: "Password updated successfully"
    });
});


router.get('/allusers', async (req, res) => {
    const filter = req.query.filter || "";
    const allusers = await User.find({
        $or: [{
            firstName : {
                "$regex": filter,
                "$options": "i"
            }
        },
        {
            lastName : {
                "$regex": filter,
                "$options": "i"
            }
        },{
            username : {
                "$regex": filter,
                "$options": "i"
            }
        }]
    })

    res.json({
        users : allusers.map(user =>({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id: user._id
        }))
    });
});


module.exports = router;