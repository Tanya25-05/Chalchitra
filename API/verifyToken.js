const jwt = require("jsonwebtoken");

function verify(req,res,next){
    const authHeader = req.headers.token;  // here we've taken token as the key in Headers
    if(authHeader){
        const token = authHeader.split(" ")[1] // why space because there is space betn Bearer and token  [0]:Bearer [1]: Access Token (as it is an array)
        jwt.verify(token,'tanya',(err,user) =>{
            if(err)  return res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });     // it'll give us error or credentials
    }
    else{     
        return res.status(401).json("You're not authenticated");         //if we dont provide any token it gives us error

    }

}

// first you have to keep your token 
// How you can send this?
// Go to POSTMAN: Headers in KEY:token  Value:Bearer "jwttoken"
module.exports = verify;