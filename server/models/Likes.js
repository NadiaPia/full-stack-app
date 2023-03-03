const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes", {
      //here we don't need define eny tables as oue Likses table need to be associated with the PostID and UsersID => in Post and Users tables we do associating with the Likes
    })
    return Likes;
} 