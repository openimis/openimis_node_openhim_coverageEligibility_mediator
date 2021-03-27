'use strict'
const dotenv = require("dotenv");
dotenv.config();
var express = require('express');
var request = require('request');
const config = require('./config').getConfig();
const logger = require('./logger');
const openhim = require('./openhim');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.post('/', (req, res) => {
    let data = req.body
    request({
      url:process.env.SOSYS_URL,
      method: 'POST',
      json:data
    }, function(error, response, body){
      if( response!=undefined && body !=undefined){
        res.send(body)
      }else{
        res.status(404).send("Member not found")
      }
    });
  })
app.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}...`)
    if (config.openhim.register) {
      openhim.mediatorSetup()
    }
  })