import helmet from 'helmet'
import compression from 'compression'
import Express from 'express'

export function prod(expressApp){
    /** @type {import('express').Express} */
    const app = expressApp
    app.use(helmet())
    app.use(compression())
}