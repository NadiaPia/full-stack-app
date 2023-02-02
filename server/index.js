const express = require("express");
const app = express();

app.use(express.json())  //to be able to unparse the json data in the req.body

const db = require("./models");


//Routers

const postRouter = require("./routes/Posts")
app.use("/posts", postRouter) //all route handlers for requests that come to '/posts' routes  should be looked for in the  'postRouter'


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001")
    });
});
