const express = require("express");
const router = express.Router();
const { Users } = require("../models")


//in this case we need a post request that will insert data in a Users table

router.post("/", async (req, res) => {
    
});


module.exports = router;