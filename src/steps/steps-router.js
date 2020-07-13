const path = require('path')
const express = require('express')
const StepsServices = require('./steps-service')

const stepsRouter = express.Router()
const jsonParser = express.json()


stepsRouter
    .route('/')
    .get((req, res, next) => {
        var qtutorialid = req.query.tutorialid || "";
        //tutorialid 
        if (qtutorialid != "") {
            StepsServices.getAllStepsbyTutorialId(req.app.get('db'), qtutorialid)
                .then(steps => {
                    res.json(steps)
                })
                .catch(next)
        }
        //if its empty
        else {
            StepsServices.getAllSteps(req.app.get('db'))
                .then(steps => {
                    res.json(steps)
                })
                .catch(next)
        }
    })
    .post(jsonParser, (req, res, next) => {
        const { element, placement, title, content, tutorialid } = req.body
        const newStep = { element, placement, title, content, tutorialid }

        for (const [key, value] of Object.entries(newStep)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        newStep.title = title
        StepsServices.insertStep(
            req.app.get('db'),
            newStep
        )
            .then(step => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl + `/${step.id}`))
                    .json(step)
            })
            .catch(next)
    })

stepsRouter
    .route('/:step_id')
    .all((req, res, next) => {
        StepsServices.getById(
            req.app.get('db'),
            req.params.step_id
        )
            .then(step => {
                if (!step) {
                    return res.status(404).json({
                        error: { message: `Step doesn't exist` }
                    })
                }
                res.step = step 
                next() 
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json({
            id: res.step.id,
            element: res.step.element,
            placement: res.step.placement,
            title: res.step.title,
            content: res.step.content,
            tutorialid: res.step.tutorialid
        })
    })
    .delete((req, res, next) => {
        StepsServices.deleteStep(
            req.app.get('db'),
            req.params.step_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { element, placement, title, content } = req.body
        const stepToUpdate = { element, placement, title, content }
        const numberOfValues = Object.values(stepToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: numberOFValues
                }
            })
        }

        StepsServices.updateStep(
            req.app.get('db'),
            req.params.step_id,
            stepToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = stepsRouter