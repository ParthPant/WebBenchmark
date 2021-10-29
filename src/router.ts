import express from 'express'
import { addApp, delApp, getApp } from './db/apps'
import { addJob } from './queue'

const Router = express.Router()

Router.use(function timeLog (req, res, next) {
    next()
})

Router.post('/send-code', (req, res) => {
    if (!req.body.code) {
        res.status(406).send("body has no code")
    }

    let id: number;

    addApp({code: req.body.code})
    .then(async app => {
        id = app[0]
        res.status(201).json({id}).end()
        addJob(id)
    })
    .catch(err => {
        console.log(err)
        res.status(500).end()
    })
})

Router.get('/get-status/:id', (req, res) => {
    getApp(parseInt(req.params.id, 10))
    .then(app => {
        if (app.length == 0) res.status(404).end()
        else {
            if (app[0].EXIT_STATUS == null) res.status(204).end()
            else {
                res.json(app).end()
                return delApp(app[0].ID)
            }
        }
    })
    .catch(err => {
        console.log(err)
    })
})

export { Router }
