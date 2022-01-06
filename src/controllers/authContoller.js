const UsersModel = require("../models/userModel");
const response = require("../core/response");
const bcrypt = require("bcrypt");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const mailer = require("../core/mailer");

class Auth {
  auth = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UsersModel.findOne({
        where: {
          email,
        },
      });
      
      response.code = 100;
      //cek user
      if (user) {
        const matchPass = await bcrypt.compare(password, user.password);
        if (matchPass) {
          //jwt proccess
          const { id, email } = user;
          delete user["delete"];
          const accessToken = jwt.sign(
            { id, email },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "20s",
            }
          );
          const refreshToken = jwt.sign(
            { id, email },
            process.env.REFRESH_TOKEN_SECRET,
            {
              expiresIn: "1d",
            }
          );
          await UsersModel.update(
            { refresh_token: refreshToken },
            {
              where: {
                id,
              },
            }
          );

          response.code = 200;
          response.message = "Success";
          response.data = {
            data: {
              id,
              email,
            },
            token: accessToken,
          };
        }
      }
      res.send(response.getResponse());
    } catch (error) {
      response.code = 500;
      response.message = error.message;
      res.send(response.getResponse());
    }
  };

  registrasi = async (req, res, next) => {
    const modelAttr = UsersModel.rawAttributes;
    const inputs = {};
    // console.log("file",req.files);
    // console.log("body",req.body);

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

  logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await UsersModel.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) return res.sendStatus(204);
    const userId = user.id;
    await UsersModel.update(
      { refresh_token: null },
      {
        where: {
          id: userId,
        },
      }
    );
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  };

  refreshToken = async (req, res) => {
    try {
      const refreshToken = req.headers.token;

      if (!refreshToken) return res.sendStatus(401);
      const user = await UsersModel.findOne({
        where: {
          refresh_token: refreshToken,
        },
      });
      if (!user) return res.sendStatus(403);
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) return res.sendStatus(403);
          const id = user.id;
          const email = user.email;
          const accessToken = jwt.sign(
            { id, email },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "15s",
            }
          );
          res.json({ accessToken });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new Auth();
