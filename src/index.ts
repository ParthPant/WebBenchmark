import express from 'express'
import cors from 'cors'
import { Router as profilerRouter } from './router'
import { BullRouter } from './queue'

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())

const port = process.env.PORT || 3000

app.post('/', (req, res) => {
    res.status(200)
    res.send("Profiler Entrypoints")
})

app.use('/profile', profilerRouter);
app.use('/admin/queue', BullRouter)

app.listen(port, () => {
    console.log("Server running at http://localhost:" + port)
})