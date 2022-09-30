const express = require("express");
const connection = require('./configs/db');
const authRouter = require("./middlewares/auth");
const userRouter = require("./controllers/user.controller")
const app = express();
const cors = require('cors');
const feedRouter = require("./controllers/feeds.controller");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/profile', userRouter);
app.use('/feeds', feedRouter);

app.get("/", (req, res) => {
    return res.status(200).send("Hello")
});

app.listen(8080, async () => {
    try{
        await connection;
        console.log("Server started on port 8080");
    }
    catch(err){
        console.log("Error", err.message)
    }
});
