const path = require('path')
const express = require('express')
const xss = require('xss')
const TutorialsServices = require('./tutorials-service')

const tutorialsRouter = express.Router()
const jsonParser = express.json()

tutorialsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        TutorialsServices.getAllTutorials(knexInstance)
            .then(tutorials => {
                res.json(tutorials)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { name } = req.body
        const newTutorial = { name }

        for (const [key, value] of Object.entries(newTutorial)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        newTutorial.title = title
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
                res.tutorial = tutorial // save the article for the next middleware
                next() // don't forget to call next so the next middleware happens!
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json({
            id: res.tutorial.id,
            name: res.tutorial.name,
        })
    })
    .delete((req, res, next) => {
        TutorialsServices.deleteTutorial(
            req.app.get('db'),
            req.params.tutorial_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { name } = req.body
        const tutorialToUpdate = { name }

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