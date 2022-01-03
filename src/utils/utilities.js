class Utilities {
  makeid(length = 18) {
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    let result = '';
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
}

export default new Utilities();
