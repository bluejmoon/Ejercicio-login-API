const jwt = require ("jsonwebtoken");
require ("dotenv").config();
const decodeSecret = Buffer.from(process.env.JWT_SECRET, "base64").toString("utf-8");

// generación de middleware que va a verificar el jwt

exports.verifyToken = (req, res, next) => {
    const authorizationHeaders = req.headers.authorization;
    if(!authorizationHeaders) {
        return res.status(404).json({error: "No token provided"});
    }
    const token = authorizationHeaders.replace("Bearer ","");
    jwt.verify(token, decodeSecret, (err, decoded) => {
        if(err) {
            console.log(decoded, token, process.env.JWT_SECRET);
            return res.status(401).json({error:"invalid token"});
        }
        req.user = decoded;
        next();
    });
};