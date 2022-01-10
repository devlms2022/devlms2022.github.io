class Utilities {
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
          .replace(/\\["\\\/bfnrtu]/g, '@')
          .replace(
            /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            ']',
          )
          .replace(/(?:^|:|,)(?:\s*\[)+/g, ''),
      )
    ) {
     return true
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
}

export default new Utilities();
