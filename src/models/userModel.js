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
    front_name : {
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
    burger_service_nummer : {
        type : DataTypes.STRING,
        allowNull : false
    },
    address : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    postal_code : {
        type : DataTypes.STRING,
        allowNull : true
    },
    identity_card: {
        type : DataTypes.STRING,
        allowNull : true
    },
    grades : {
        type : DataTypes.STRING,
        allowNull : true
    },
    birthday : {
        type : DataTypes.DATE,
        allowNull : true
    },
    proof_teacher_grade : {
        type : DataTypes.CHAR,
        allowNull : true
    },
    reg_code_branch : {
        type : DataTypes.CHAR,
        allowNull : true
    },
    gender : {
        type : DataTypes.CHAR,
        allowNull : false
    }
},{
    freezeTableName : true,
    modelName: "users",
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
});


module.exports = UsersModel;