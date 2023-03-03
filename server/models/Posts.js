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
    //That meens in the Comments table will appear one more column PostID

    Posts.associate = (models) => {
        Posts.hasMany(models.Likes, {
            onDelete: "cascade",  
        });
    };

    return Posts;
} 