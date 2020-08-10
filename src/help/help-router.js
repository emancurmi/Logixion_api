const path = require('path')
const express = require('express')
const HelpService = require('./help-services')

const helpRouter = express.Router()

helpRouter
    .route('/')
    .get((req, res, next) => {
        res.send('<h1>API Routes</h1></br>' +

            '<h2>Steps Api</h2>' +
            '<p>' +
            '/api/steps</br> ' +
            '/api/steps/stepid </br>' +
            '/api/steps/tutorialid </br>' +
            '</p>' +

            '<h2>Tutorials</h2>' +
            '<p>' +
            '/api/tutorials </br>' +
            '/api/tutorials/id </br>' +
            '</p>' +

            '<h2>Generate Tutorials</h2>' +
            '<p>' +
            '/api/generatetutorial/tutorialid </br>' +
            '</p>'
        );
    })
    
module.exports = helpRouter