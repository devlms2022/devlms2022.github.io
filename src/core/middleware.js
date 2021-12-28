/**
 * Middleware
 */

 const log = require('../configs/logger');
 const jwt = require('jsonwebtoken');

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
 
 module.exports = {
     writeReq,
     verifyToken
 }
 /**
  * Middleware
  */