const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwt_passcode } = require("./config");

async function hashPassword(password){
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(input, storedHash){
    return await bcrypt.compare(input, storedHash);
}

function generateToken(userId) {
    return jwt.sign({id: userId}, jwt_passcode, { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Token missing." });
    jwt.verify(token, jwt_passcode, (err, user) => {
        if (err) return res.status(403).json({ message: "Token invalid." });
        req.user = user;
        next();
    });
}

module.exports = {
    hashPassword,
    verifyPassword,
    generateToken,
    authenticateToken
};