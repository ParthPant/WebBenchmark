import fs from 'fs'
import { spawn } from 'child_process'
import { vars } from './vars'

const cleanup = () => {
    fs.copyFileSync(vars.ProfilerDefSourcePath, vars.ProfilerSourcePath)
}

//const NOBODY_UID = process.env.NOBODY_UID || 65534

const executeCode = (code: string) : Promise<number> => {
    return new Promise((resolve, reject) => {
        fs.writeFileSync(vars.ProfilerSourcePath, code)
        const process = spawn('sh', ['run-safe.sh'], {cwd: vars.ProfilerPath})
        process.on('exit', exit_code => {
            cleanup()
            resolve(exit_code as number)
        })
        process.on('error', err => {
            reject(err)
        })
    })
}

export { executeCode }
