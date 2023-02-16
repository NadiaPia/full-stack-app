const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require('bcrypt');

//Registration. Here we need grab the req.body.username and req.body.password from the 
//request and put thm in the db

router.post("/", async (req, res) => {
    const {userNAme, password} = req.body //the same as const .......password = req.body.password.....
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({                   //here we say our models to add new user to our db
            userNAme: userNAme,
            password: hash,             //because we alredy hashed our password
        })
        res.json("Success")
    })
});

// Login. Here we need grab the req.body.username and req.body.password from the 
//request and check whether we have therm in our database

router.post("/login", async(req, res) => {
    const {username, password} = req.body //the same as const .......password = req.body.password.....
    const user = await Users.findOne({where: {userNAme: username}});
    if(!user) res.json({error: "User doesn't Exist"}); //if user exist, let's check the password:

    //we cannot unhash user.password(password from the db,
    //we only can hash password from the request(req.body.password) and compare them)
    bcrypt.compare(password, user.password).then((match) => {
        if(!match) res.json({error: "Wrong Username and Password combination"});
        res.json("YOU LOGGED IN!!!")
    }) 
    

})


module.exports = router;