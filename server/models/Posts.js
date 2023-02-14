const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userNAme: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    })
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",  //if we delete a post, all comments of it should be deleted as well
        });
    };

    return Posts;
} 