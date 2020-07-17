const path = require('path')
const express = require('express')
const HelpService = require('./help-service')

const helpRouter = express.Router()

helpRouter
    .route('/')
    .get((req, res, next) => {        
        HelpService.getAllHelp()
                .then(help => {
                    res.json(help)
                })
                .catch(next)
        
    })
    
module.exports = helpRouter