const jwt = require("jsonwebtoken");
const { jwt_passcode } = require("../utils/config.js");

function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token missing." });
    }
    const token = authHeader.split(" ")[1];

    try {
        const decodedVal = jwt.verify(token, jwt_passcode);
        if (decodedVal.id) {
            req.userId = decodedVal.id;
            next();
        } else {
            res.status(403).json({ message: "User not authenticated." });
        }
    } catch (e) {
        res.status(401).json({ message: "Invalid token." });
    }
}

module.exports = {
    userMiddleware
};