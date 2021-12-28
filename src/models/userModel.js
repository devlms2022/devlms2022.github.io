const { DataTypes, UUIDV4} = require('sequelize');
// const {DataTypes} = Sequelize;
const db = require('../configs/database');

const UsersModel = db.define('users',{
    id : {
        type : DataTypes.STRING,
        primaryKey : true,
        defaultValue: UUIDV4,
    },
    email : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false,
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    first_name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    family_name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    role_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    refresh_token : {
        type : DataTypes.STRING,
        allowNull : true,
    },
},{
    freezeTableName : true,
    modelName: "users",
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
});


module.exports = UsersModel;