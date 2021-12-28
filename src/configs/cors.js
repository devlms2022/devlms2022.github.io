/**
 * CORS Configuration
 */

const allowList = JSON.parse(process.env.ALLOW_ORIGINS || "[]");

const options = function (req, callback) {
  const origin = req.header("Origin");
  let options = {
    origin: true,
    credentials: true,
  };

  const checkAllOrigins = allowList.includes("*");
  if (!checkAllOrigins)
    if (!allowList.includes(origin))
      options = { origin: false, credentials: false };

  // options.allowHeaders = ['token'];
  // options.exposedHeaders = ["token"];

  callback(null, options);
};

module.exports = options;
