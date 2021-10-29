import { connectKnex as connection } from "./knex";

interface App {
    code: string
}

const addApp = (app: App) => {
    return connection('APPS').insert({CODE: app.code})
}

const getApp = (id: number) => {
    return connection('APPS').where('ID', id)
}

const addAppResult = (id: number, output: string | null, status: number) => {
    return connection('APPS').where('ID', id).update({OUTPUT: output, EXIT_STATUS: status})
}

const delApp = (id: number) => {
    return connection('APPS').where('ID', id).del()
}

export { addApp, getApp, addAppResult, delApp }