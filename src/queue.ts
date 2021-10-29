import Bull, { Job } from "bull";
import fs from 'fs'
import { vars } from './vars'
import { executeCode } from "./execute";
import { addAppResult, getApp } from './db/apps'

import { createBullBoard } from 'bull-board'
import { BullAdapter } from 'bull-board/bullAdapter'

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1'
const REDIS_PORT = process.env.REDIS_PORT || 6379

const Queue = new Bull('app-queue', { redis: { port: REDIS_PORT as number, host: REDIS_HOST } })

const { router, setQueues, replaceQueues, addQueue, removeQueue } = createBullBoard([
    new BullAdapter(Queue, {readOnlyMode : true})
])

Queue.process(async (job, done) => {
    const app_id = job.data.app_id

    try {
        const app = await getApp(app_id)
        const status = await executeCode(app[0].CODE.toString())
        let profilerOutput
        if (status == 0) {
            profilerOutput = fs.readFileSync(vars.ProfilerOutputPath).toString()
        } else {
            profilerOutput = fs.readFileSync(vars.ProfilerLogPath).toString()
        }
        done(null, {profilerOutput, status})
    } catch (err) {
        throw new Error("error while processing app")
    }
})

const addJob = (app_id: string) => {
    Queue.add({app_id})
    .then(() => {
    })
}

Queue.on('failed', job => console.log(job))

Queue.on('completed', (job, result) => {
    const app_id = job.data.app_id
    addAppResult(app_id, result.profilerOutput, result.status)
    .catch(err => {console.log(err)})
})

export { addJob, router as BullRouter }