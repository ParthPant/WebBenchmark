import fs from 'fs'
import { spawn } from 'child_process'
import { vars } from './vars'

const cleanup = () => {
    fs.copyFileSync(vars.ProfilerDefSourcePath, vars.ProfilerSourcePath)
}

const executeCode = (code: string) : Promise<number> => {
    return new Promise((resolve, reject) => {
        fs.writeFileSync(vars.ProfilerSourcePath, code)
        const process = spawn('docker-compose', ['up', '--exit-code-from', 'app'], {cwd: vars.ProfilerPath})
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