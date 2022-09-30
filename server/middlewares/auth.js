const express = require('express');
const User = require('../models/user.model')

const authRouter = express.Router();


authRouter.post("/signup", async(req, res) => {
    try{
        const user = User(req.body);
        await user.save();
        return res.status(201).send(user)
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})


authRouter.post("/login", async(req, res) => {
    try{
        const {username, password} = req.body
        const user = await User.find({username, password}, {name : 1 });
        if(user.length > 0){
            return res.send({message : "Login Success", token : 123456, user})
        }
        else{
            return res.send("User not found");
        }
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})


module.exports = authRouter;