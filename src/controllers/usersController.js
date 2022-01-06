const UsersModel = require("../models/userModel");
const response = require("../core/response");
const bcrypt = require("bcrypt");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const mailer = require("../core/mailer");
const UserProfile = require("../models/userProfileModel");
class Users {
  getAll = async (req, res, next) => {
    const options = {
      include: [
        {
          model: UserProfile,
        },
      ],
    };
    try {
      const users = await UsersModel.findAll();
      response.code = 200;
      response.message = "Success";
      response.data = users;
      res.send(response.getResponse());
    } catch (error) {
      response.code = 500;
      res.send(500).message(response.getResponse());
    }
  };

  getById = async (req, res, next) => {};

  insert = async (req, res, next) => {
    const modelAttr = UsersModel.rawAttributes;
    const inputs = {};

    Object.values(modelAttr).forEach((val) => {
      if (val.field != "id") {
        if (req.body[val.field] != null) {
          inputs[val.fieldName] = req.body[val.field];
        } else {
          inputs[val.fieldName] = null;
        }
      }
    });

    if (req.files) {
      Object.values(req.files).forEach(([item]) => {
        inputs[item.fieldname] = item.filename;
      });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(inputs.password, salt);
    inputs.password = hashPassword;
    try {
      const result = await UsersModel.create(inputs);
      response.code = 200;
      response.message = "Account has been created!";
      delete inputs["password"];
      response.data = inputs;
      mailer.sendWaiting(
        {
          emailTo: inputs.email,
          front_name: inputs.front_name,
        },
        (res) => {
          console.log(res);
        }
      );
      res.send(response.getResponse());
    } catch (error) {
      response.code = 500;
      response.message = error.message;
      res.send(response.getResponse());
    }
  };

  delete = async (req, res, next) => {};

  update = async (req, res, next) => {};
}

module.exports = new Users();
