const jwt = require("jsonwebtoken");;

const verifyJWTToken = (req, res, next) => {

    let token = req.headers["access-token"];

    if (!token) {
        return res.status(403).send({
            message: "Token not available"
        });
    }

    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthenticated access"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyJWTToken