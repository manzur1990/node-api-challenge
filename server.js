const express = require('express')

const projectsRouter = require('./routers/projectsRouter')
const actionsRouter = require('./routers/actionsRouter')


const server = express()


server.get('/', (req, res) =>{
    res.send(`<h1>Welcome Traveler</h1>`)
})
server.use(express.json())
server.use('/projects', projectsRouter)
server.use('/actions', actionsRouter)


module.exports = server