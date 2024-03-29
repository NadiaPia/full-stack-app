const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require('bcrypt');
const {validateToken} = require("../middlewares/AuthMiddlewares")

const {sign} = require('jsonwebtoken');  //sign is a function to generate webtoken

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
    const {userNAme, password} = req.body //the same as const .......password = req.body.password.....
    const user = await Users.findOne({where: {userNAme: userNAme}});
    if(!user) res.json({error: "User doesn't Exist"}); //if user exist, let's check the password:

    //we cannot unhash user.password(password from the db,
    //we only can hash password from the request(req.body.password) and compare them)
    bcrypt.compare(password, user.password).then((match) => {
        if(!match) res.json({error: "Wrong Username and Password combination"});

        //if user exists and his username and password is a correct combination we want to generate webtoken:
        const accessToken = sign({userName: user.userNAme, id: user.id}, "importantsecret") //the argument is the data that we need to keep sequre and a secret
        //the webtoken is gonna to hash this data
        res.json({token: accessToken, userName: userNAme, id: user.id })   //sent it to the FE to have an access in the FE
    })

})

router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id;
    const basicInfo = await Users.findByPk(id, {
        attributes: {exclude: ["password"]},
    })
    res.json(basicInfo)
})

router.put("/changepassword", validateToken, async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    const user = await Users.findOne({where: {userNAme: req.user.userName}});

    bcrypt.compare(oldPassword, user.password).then(async (match) => {
        if(!match) res.json({error: "Wrong Password Entered!"});

        bcrypt.hash(newPassword, 10).then((hash) => {
            Users.update({password: hash}, {where: {userNAme: req.user.userName}})
            res.json("Success")
        })
    })

} )


module.exports = router;