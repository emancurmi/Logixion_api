const path = require('path')
const express = require('express')
const HelpService = require('./help-services')

const helpRouter = express.Router()

helpRouter
    .route('/')
    .get((req, res, next) => {        
        //HelpService.getAllHelp()
        //        .then(
        //            return help;
        //        )
        //        .catch(next)
    })
    
module.exports = helpRouter