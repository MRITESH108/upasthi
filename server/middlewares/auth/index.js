const jwt = require('jsonwebtoken');

const authProtect = (req,res,next)=>{
    const token = req.cookies.token;

    // if no token
    if(!token) {
        return res.status(400).json({
            message: "Not loggined!"
        });
    }

    // validation of token 
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
        if(err){
            return res.status(400).json({
                message: "Token not verified"
            });
        }
        req.user = decoded;
        next();
    });
}


module.exports = authProtect;