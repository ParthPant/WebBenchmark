import express from 'express'
import {v4 as uuidv4 } from 'uuid'
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

    let uuid = uuidv4()

    addApp({uuid, code: req.body.code})
    .then(async _app => {
        res.status(201).json({uuid}).end()
        addJob(uuid)
    })
    .catch(err => {
        console.log(err)
        res.status(500).end()
    })
})

Router.get('/get-status/:uuid', (req, res) => {
    getApp(req.params.uuid)
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
