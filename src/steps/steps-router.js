const path = require('path')
const express = require('express')
const xss = require('xss')
const StepsServices = require('./steps-service')

const stepsRouter = express.Router()
const jsonParser = express.json()


const serializeSteps = step => ({
    id: step.id,
    element: step.element,
    placement: step.placement,
    title: step.title,
    content: step.content
})


stepsRouter
    .route('/')
    .get((req, res, next) => {
        StepsServices.getAllSteps(req.app.get('db'))
            .then(steps => {
                res.json(steps.map(serializeSteps))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { element, placement, title, content } = req.body
        const newStep = { element, placement, title, content }

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
                res.step = step // save the article for the next middleware
                next() // don't forget to call next so the next middleware happens!
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
                    message: `Request body must contain either 'title'`
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