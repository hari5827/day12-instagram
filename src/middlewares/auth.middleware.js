const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Token required"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.jwt_secret
        );

        req.user = decoded; // store user info

        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Unauthorized access"
        });
    }
};

module.exports = authMiddleware;