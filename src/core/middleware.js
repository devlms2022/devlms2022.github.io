/**
 * Middleware
 */

 const log = require('../configs/logger');
 const jwt = require('jsonwebtoken');
 const multer = require('multer');
 const moment = require('moment');
 const Util = require('./utilities');

 const writeReq = async (req, res, next) => {
     const {
         path,
         method
     } = req
     let ip = req.connection.remoteAddress
 
     if (ip.substr(0, 7) == "::ffff:") ip = ip.substr(7);
 
     log.info(`NEW REQUEST: (${path}) | IP: ${ip} | METHOD: ${method}`, JSON.stringify(req.body));
 
     next()
 }

 const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[0];
  
    console.log("token :", token);
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        console.log(err);
        if(err) return res.sendStatus(403)
        req.email = decoded.email;
        next();
    })
 };

 const uploads = (pathname) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "public/uploads/"+pathname);
        },
        filename: function (req, file, cb) {
            const split =  file.originalname.replace(/\s/g, '').split('.');
            const filename = split[0];
            const extentsion = split[1];
          cb(null, Util.makeid(18)+moment().format('DD-MM-YY')+"."+extentsion);
        },
      });
      
      const upload = multer({ storage });
      return upload;
 }
 
 module.exports = {
     writeReq,
     verifyToken,
     uploads
 }
 /**
  * Middleware
  */