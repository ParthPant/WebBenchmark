import { connectKnex as connection } from "./knex";

interface App {
    uuid: string,
    code: string
}

const addApp = (app: App) => {
    return connection('APPS').insert({UUID: app.uuid, CODE: app.code})
}

const getApp = (uuid: string) => {
    return connection('APPS').where('UUID', uuid)
}

const addAppResult = (uuid: string, output: string | null, status: number) => {
    return connection('APPS').where('UUID', uuid).update({OUTPUT: output, EXIT_STATUS: status})
}

const delApp = (uuid: string) => {
    return connection('APPS').where('UUID', uuid).del()
}

export { addApp, getApp, addAppResult, delApp }