import moment from "moment";
class Utilities {
  now_timestamp() {
    return moment().format("YYYY-MM-DD HH:mm:ss").toString();
  }
  now() {
    return moment().format("YYYY-MM-DD").toString();
  }

  moment(date) {
    return moment(date).format("YYYY-MM-DD");
  }

  makeid(length = 18) {
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    let result = "";
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  objectLength(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }

    return size;
  }
  //custom message SimpleReactValidator
  messageValidator = {
    required: "This row is required!",
    min: "This row cannot be less than :min!",
    max: "This row cannot be more than :max!",
    email: "This row must be a valid email!",
    numeric: "This row must be a number!",
    in: `:attribute are not the same!`,
  };

  isJsonString(str) {
    if (
      /^[\],:{}\s]*$/.test(
        str
          .replace(/\\["\\\/bfnrtu]/g, "@")
          .replace(
            /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            "]"
          )
          .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
      )
    ) {
      return true;
    } else return false;
  }

  readFileBlob(res, cb) {
    var reader = new FileReader();
    reader.readAsDataURL(res);
    reader.onload = function () {
      var imageDataUrl = reader.result;
      cb(imageDataUrl);
    };
  }
  readBlobAsText(blob, cb) {
    var reader = new FileReader();
    reader.readAsText(blob);
    reader.onload = function () {
      var text = reader.result;
      cb(text);
    };
  }

  cekFile(data, cb) {
    this.readBlobAsText(data, (string) => {
      const isJSON = this.isJsonString(string);
      if (isJSON) {
        const response = JSON.parse(string);
        if (response.code === 404) {
          cb(false);
        }
      } else {
        this.readFileBlob(data, (response) => {
          cb(response);
        });
      }
    });
  }

  ytURLParser(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length >= 11) {
      const urlEmbed = `https://www.youtube.com/embed/${match[2]}`;
      return urlEmbed;
    } else {
      return false;
    }
  }
}

export default new Utilities();
