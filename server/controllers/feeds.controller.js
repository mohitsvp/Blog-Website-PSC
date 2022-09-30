const express = require('express');
const Feed = require("../models/feed.model");
const User = require("../models/user.model")

const feedRouter = express.Router();

feedRouter.post("/:userId", async (req, res) => {
    try{    
        const {userId} = req.params
        const feeds = await Feed(req.body);
        await feeds.save();
        console.log(feeds);
        const user = await User.findById(userId);
        user.blogs = [...user.blogs, feeds._id]
        await user.save();
        return res.status(201).send(feeds);
    }
    catch(err){
        return res.status(500).send(err.message)
    }
})


feedRouter.get("/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const feed = await Feed.findById(id).populate("userId")
        return res.status(200).send(feed)
    }
    catch(err){
        return res.status(500).send(err.message)
    }
})


module.exports = feedRouter;