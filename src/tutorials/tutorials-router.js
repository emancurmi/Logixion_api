const path = require('path')
const express = require('express')
const TutorialsServices = require('./tutorials-service')
const TutorialStepsServices = require('../tutorialsteps/tutorialsteps-service')

const tutorialsRouter = express.Router()
const jsonParser = express.json()

const serializeTutorials = step => ({
    id: tutorial.id,
    name: tutorial.name,
    userid: tutorial.userid
})

tutorialsRouter
    .route('/')
    .get((req, res, next) => {
        var quserid = req.query.userid || "";

        if (quserid != "") {
            TutorialsServices.getAllTutorialsbyUserId(req.app.get('db'), quserid)
                .then(tutorials => {
                    res.json(tutorials)
                })
                .catch(next)
        }
        else {
            TutorialsServices.getAllTutorials(req.app.get('db'))
                .then(tutorials => {
                    res.json(tutorials)
                })
                .catch(next)
        }
    })
    .post(jsonParser, (req, res, next) => {
        const { name, userid } = req.body
        const newTutorial = { name, userid }

        for (const [key, value] of Object.entries(newTutorial)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        newTutorial.name = name
        TutorialsServices.insertTutorial(
            req.app.get('db'),
            newTutorial
        )
            .then(tutorial => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl + `/${tutorial.id}`))
                    .json(tutorial)
            })
            .catch(next)
    })

tutorialsRouter
    .route('/:tutorial_id')
    .all((req, res, next) => {
        TutorialsServices.getById(
            req.app.get('db'),
            req.params.tutorial_id
        )
            .then(tutorial => {
                if (!tutorial) {
                    return res.status(404).json({
                        error: { message: `Tutorial doesn't exist` }
                    })
                }
                res.tutorial = tutorial 
                next() 
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json({
            id: res.tutorial.id,
            name: res.tutorial.name,
            userid: res.tutorial.userid
        })
    })
    .delete((req, res, next) => {
        TutorialsServices.deleteTutorial(
            req.app.get('db'),
            req.params.tutorial_id
        )

        TutorialStepsServices.deleteStepbyTutorialId(
            req.app.get('db'),
            req.params.tutorial_id
        )

            .then(() => {
                res.status(204).end()
            })
            .catch(next)
        StepsServices.delete()
    })
    .patch(jsonParser, (req, res, next) => {
        const { name, userid } = req.body
        const tutorialToUpdate = { name, userid }

        const numberOfValues = Object.values(tutorialToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain either 'title'`
                }
            })
        }

        TutorialsServices.updateTutorial(
            req.app.get('db'),
            req.params.tutorial_id,
            tutorialToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = tutorialsRouter