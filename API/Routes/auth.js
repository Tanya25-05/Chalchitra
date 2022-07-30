const router = require("express").Router();
const User = require("../Models/User"); 
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");   // authorization

// REGISTER   
router.post("/register", async (req,res)=>{
   // Create a user and we use model 
    const newUser = new User({
        // request body from postman where we send our credentials
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,'tanya').toString(),
    });
    try{
    // sending this to DB
    const user = await newUser.save(); 
    res.status(201).json(user);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});      // user makes request to the URL and it sends response  "/register":URL


// LOGIN
router.post("/login", async (req,res) =>{
    try{
        const user = await User.findOne({ email:req.body.email});
        if(!user) 
        return res.status(401).json({error: "wrong email password or username!"});

        const bytes = CryptoJS.AES.decrypt(user.password, 'tanya');   // DECRYPTS the password (imported from crypto.js)
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
         
        if(originalPassword !== req.body.password) 
        return res.status(401).json({error:"wrong email password or username!"});
        
        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },    // properties o.e. given to the access token
                'tanya',          // 'tanya' is the secret key
                {  expiresIn: "5d"  }
            );
        
        // HIDE PASSWORD (store it in local storage)
        const { password, ...info } = user._doc   // ._doc contains the data we specify in schema

        res.status(200).json({...info, accessToken});
    }
    catch(err)
    {
      res.status(500).json(err);  
    }

});

module.exports = router;