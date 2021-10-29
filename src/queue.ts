import Bull, { Job } from "bull";
import fs from 'fs'
import { vars } from './vars'
import { executeCode } from "./execute";
import { addAppResult, getApp } from './db/apps'

import { createBullBoard } from 'bull-board'
import { BullAdapter } from 'bull-board/bullAdapter'

const Queue = new Bull('app-queue', 'redis://127.0.0.1:6379')

const { router, setQueues, replaceQueues, addQueue, removeQueue } = createBullBoard([
    new BullAdapter(Queue)
])

Queue.process(async (job, done) => {
    console.log('processing app ')
    const app_id = job.data.app_id

    try {
        const app = await getApp(app_id as number)
        const status = await executeCode(app[0].CODE.toString())
        const profilerOutput = status == 0 ? fs.readFileSync(vars.ProfilerOutputPath).toString() : null
        done(null, {profilerOutput, status})
    } catch (err) {
        throw new Error("error while processing app")
    }
})

const addJob = (app_id: number) => {
    Queue.add({app_id})
    .then(() => {
        console.log("added to queue ", app_id)
    })
}

Queue.on('failed', job => console.log(job))

Queue.on('completed', (job, result) => {
    const app_id = job.data.app_id
    console.log('completed app ', app_id)

    addAppResult(app_id as number, result.profilerOutput, result.status)
    .catch(err => {console.log(err)})
})

export { addJob, router as BullRouter }