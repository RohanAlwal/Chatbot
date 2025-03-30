const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authmiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) return res.status(403).json({message:"NO token provided!"});

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if(err) return res.status(402).json({error:"Invalid Token"});
        req.userId = decoded.id;
        next();
    });
};

module.exports = authmiddleware;