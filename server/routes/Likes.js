const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const {validateToken} = require("../middlewares/AuthMiddlewares");

router.post("/", validateToken, async (req, res) => {
    const {PostId} = req.body //we need the info about the the UserId an the PostId.
    const UserId = req.user.id //in the validateToken function we push in the req object the unparsed username and id of the user

    await Likes.create({PostId: PostId, UserId: UserId})
    res.json("success")

})


module.exports = router;
