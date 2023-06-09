const jwt = require ("jsonwebtoken");
require ("dotenv").config();

// generación de middleware que va a verificar el jwt

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(404).json({error: "No token provided"});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({error:"invalid token"});
        }
        req.user = decoded;
        next();
    });
};