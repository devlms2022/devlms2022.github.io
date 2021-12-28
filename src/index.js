/**
 * Initial Application Server 
 * Oct 27, 2021 15:00
 */

 require('dotenv').config()
 const cors = require('cors')
 const express = require('express')
 const parser = require('body-parser')
 
 const app = express()
 const mdl = require('./core/middleware')
 const port = process.env.SERVER_PORT || 8010
 const corsOptions = require('./configs/cors')
 
 const routers = require("./routes")
 const log = require('./configs/logger')
 
 app.listen(port, () => {
     app.use(mdl.writeReq);
     app.use(cors(corsOptions))
     
     app.use(parser.json())
     app.disable('x-powered-by');
     app.use(parser.urlencoded({
         extended:true
     }))
     
     app.use(routers)
     global.APP_PATH = __dirname
     
     log.debug(`Server is running on port: ${port}`)
 })