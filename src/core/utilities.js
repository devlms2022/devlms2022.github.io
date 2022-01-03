/**
 * Utilities
 * Nov 02, 2021 09:00
 */

const moment = require("moment");
const nodemailer = require('nodemailer');

class Utilities {
  today(format = "YYYY-MM-DD") {
    const result = moment().locale("id").format(format);
    return result;
  }

  convDate(val, format = "YYYY-MM-DD") {
    const result = moment(val).locale("id").format(format);
    return result;
  }

  makeid(length = 10) {
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    var result = '';
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

 
}

module.exports = new Utilities();
