/**
 * Initial Application Server
 */

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const parser = require("body-parser");
const multer = require("multer");

const app = express();
const mdl = require("./core/middleware");
const port = process.env.PORT || 8010;
const corsOptions = require("./configs/cors");
const db = require("./configs/database");
const routers = require("./routes");
const log = require("./configs/logger");

app.listen(port, async () => {
  try {
    await db.authenticate();
    log.debug("Database Connected");
  } catch (err) {
    log.debug(`Connection Database Failed : ${err}`);
  }

  app.use(mdl.writeReq);
  app.use(cors());

  app.disable("x-powered-by");
  app.use(cookieParser());

  app.use(parser.json());
  app.use(
    parser.urlencoded({
      extended: true,
    })
  );

  app.use(routers);
  global.APP_PATH = __dirname;

  log.debug(`Server is running on port: ${port}`);
});
