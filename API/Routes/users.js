const router = require("express").Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
const verify = require('../verifyToken');



// UPDATE
router.put("/:id",verify, async (req,res) =>{
if(req.user.id === req.params.id || req.user.isAdmin){
    if(req.body.password){
        req.body.password =  CryptoJS.AES.encrypt(req.body.password,'tanya').toString();

    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { 
            $set:req.body,
         });
         res.status(200).json(updatedUser);

    }
    catch(err){
        res.status(500).json(err);
    }
} else{
    res.status(403).json("You can update only your account!")
}

});

// DELETE
router.delete("/:id",verify, async (req,res) =>{
    if(req.user.id === req.params.id || req.user.isAdmin){
    
        try{
           await User.findByIdAndDelete(req.params.id); 
             res.status(200).json("User has been deleted");
    
        }
        catch(err){
            res.status(500).json(err);
        }
    } else{
        res.status(403).json("You can delete only your account!")
    }
});
// GET
router.get("/find/:id", async (req,res) =>{
        try{
           const user = await User.findById(req.params.id); 
           const { password, ...info } = user._doc;
           res.status(200).json(info);
    
        }
        catch(err){
            res.status(500).json(err);
        }
});


// GET ALL
router.get("/",verify, async (req,res) =>{    // if we don't send any query simply "/" then it will return all the users  ("/?new=true" : returns last 10 users)
    const query = req.query.new;   //(request query with key i.e. "new")
    if( req.user.isAdmin){   // (we can see all users only if we're admin)
    
        try{
           const users = query ? await User.find().sort({id:-1}).limit(10) : await User.find();    // fetches latest data accrdg to id
             res.status(200).json(users);
    
        }
        catch(err){
            res.status(500).json(err);
        }
    } else{
        res.status(403).json("You're not allowed to see all users");
    }
});
//GET USER STATS
router.get("/stats", async (req,res) =>{
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);
   
    const monthsArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    try{
        const data = await User.aggregate([
        {  
            $project:{
                month: {$month: "$createdAt"}
            },
        },
        {
            $group:{                      // Total users per month
                _id: "$month",
                total: { $sum:1}
            },
        },
    ]);
res.status(200).json(data)
 } catch(err)
    {  res.status(500).json(err)  }
;
});
module.exports = router;