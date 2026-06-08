import genres from './genres.js'
import customers from './customers.js'
import movies from './movies.js'
import rentals from './rentals.js'
import users from './users.js'
import auth from './auth.js'
import error from '../middleware/error.js';
import express from 'express';

const routes = [
    {path:genres.api, router:genres.router},
    {path:customers.api, router:customers.router},
    {path:movies.api, router:movies.router},
    {path:rentals.api, router:rentals.router},
    {path:users.api, router:users.router},
    {path:auth.api, router:auth.router},
]

function useRoutes(app){
    app.use(express.json())
    routes.forEach(({path, router}) => {
        app.use(path, router)
    })
    app.use(error)
}

export {useRoutes}