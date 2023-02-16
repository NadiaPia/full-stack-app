const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        
        userNAme: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    })
    // Users.associate = (models) => {
    //     Users.hasMany(models.Posts, {
    //         onDelete: "cascade",  //if we delete a post, all comments of it should be deleted as well
    //     });
    // };

    return Users;
} 