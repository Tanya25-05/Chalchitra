const router = require("express").Router();
const List= require("../Models/List");
const { findByIdAndDelete } = require("../Models/User");
const verify = require('../verifyToken');

// CREATE
router.post("/",verify, async (req,res) =>{
if(req.user.isAdmin){
      const newList= new List(req.body)
    try{
        const savedList = await newList.save();
        res.status(201).json(savedList);
    }
    catch(err){
       res.status(500).json(err);
    }
}
   else{
    res.status(403).json("You are not allowed");
}
});


//DELETE
router.delete("/:id",verify,async (req,res) =>{
    if(req.user.admin){
        try{
            await List.findByIdAndDelete(req.params.id);
            res.status(201).json("The list has been Deleted");
        }
        catch(err)
        {
            res.status(500).json(err);
        }
    }
        else{
            res.status(403).json("You are not allowed");
        }
    });

    //GET
    
router.get("/",verify, async (req,res)=>{
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    // if(req.user.admin)
    let list = []; // after conditions we're going to push data into this 
    try{
        if(typeQuery){    // click movies or series on nav
            if(genreQuery){   // select genre
                list = await List.aggregate([
                    {$sample : {size:10}},
                    {$match:{type:typeQuery, genre : genreQuery}},
                ]);
            }
            else {    //if we're on home page nd not selected genre
                list = await List.aggregate([
                    {$sample : {size:10}},
                    {$match:{type:typeQuery}},
                ]);
            }
        }
        else{
            list = await List.aggregate([{$sample:{size:10}}]);
        }
        res.status(200).json(list);

    }
    catch(err){
        res.status(500).json(err)

    }

})

//GET LIST


module.exports = router;