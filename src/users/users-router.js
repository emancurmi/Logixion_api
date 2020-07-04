const path = require('path')
const express = require('express')
const xss = require('xss')
const UsersServices = require('./users-services')

const usersRouter = express.Router()
const jsonParser = express.json()

usersRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        UsersServices.getAllUsers(knexInstance)
            .then(users => {
                res.json(users)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { username, password } = req.body
        const newUser = { username, password }

        for (const [key, value] of Object.entries(newUser)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        newUser.title = title
        UsersServices.insertUser(
            req.app.get('db'),
            newUser
        )
            .then(user => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl + `/${user.id}`))
                    .json(user)
            })
            .catch(next)
    })

usersRouter
    .route('/:user_id')
    .all((req, res, next) => {
        UsersServices.getById(
            req.app.get('db'),
            req.params.article_id
        )
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: { message: `User doesn't exist` }
                    })
                }
                res.user = user // save the article for the next middleware
                next() // don't forget to call next so the next middleware happens!
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json({
            id: res.user.id,
        })
    })
    .delete((req, res, next) => {
        UsersServices.deleteUser(
            req.app.get('db'),
            req.params.user_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { username, password } = req.body
        const userToUpdate = { username, password }

        const numberOfValues = Object.values(userToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain either 'title'`
                }
            })
        }

        UsersServices.updateUser(
            req.app.get('db'),
            req.params.user_id,
            userToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })


module.exports = usersRouter