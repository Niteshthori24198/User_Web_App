require('dotenv').config();
const jwt = require('jsonwebtoken');

const AuthMiddleware = async (req, res, next) => {
   
    if (!req.headers['authorization']) {
        return res.status(400).send({
            "msg": "Invalid Access.",
            "success": false
        })
    }

    const token = req.headers['authorization'].split(' ')[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SecretKey);
            if (decoded.userId) {
                req.body.UserID = decoded.userId;
                next();
            } else {
                return res.status(400).send({
                    "msg": "Kindly Login First !!",
                    "success": false
                })
            }
        } catch (error) {
            return res.status(400).send({
                "msg": "Invalid JWT Token !!"
            })
        }
    } else {
        return res.status(400).send({
            "msg": "Kindly Login First !!",
            "success": false
        })
    }
}


module.exports = {
    AuthMiddleware
}