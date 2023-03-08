const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const {validateToken} = require("../middlewares/AuthMiddlewares");

router.post("/", validateToken, async (req, res) => {
    const {PostId} = req.body //we need the info about the the UserId an the PostId.
    const UserId = req.user.id //in the validateToken function we push in the req object the unparsed username and id of the user

    const found = await Likes.findOne({
        where: {PostId: PostId, UserId: UserId},
    });

    if(!found) {
        await Likes.create({PostId: PostId, UserId: UserId});
        res.json({liked: true});
    } else {
       await Likes.destroy({
        where: {PostId: PostId, UserId: UserId},
    });
    res.json({liked: false})
    }

})


module.exports = router;
