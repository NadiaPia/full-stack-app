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
    return Posts;
} 