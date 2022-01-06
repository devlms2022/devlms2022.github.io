const { DataTypes, UUIDV4 } = require("sequelize");
// const {DataTypes} = Sequelize;
const db = require("../configs/database");
const UserProfile = require("./userProfileModel");

const UsersModel = db.define(
  "lms_users",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_login: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    profile_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

UsersModel.hasOne(UserProfile, { foreignKey: "id", sourceKey: "profile_id" });

module.exports = UsersModel;
