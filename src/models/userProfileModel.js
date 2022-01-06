const { DataTypes, UUIDV4 } = require("sequelize");
// const {DataTypes} = Sequelize;
const db = require("../configs/database");

const UserProfile = db.define(
  "lms_user_profiles",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    front_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    family_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    burger_service_nummer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    identity_card: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    grades: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    proof_teacher_grade: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    reg_code_branch: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    gender: {
      type: DataTypes.CHAR,
      allowNull: false,
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

module.exports = UserProfile;
