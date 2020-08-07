const express = require("express")
const server = express()
const Projects = require("../data/helpers/projectModel.js")
const router = express.Router()
server.use(express.json())

//Get Projects
router.get("/", (req, res) => {
    Projects.get()
        .then(projectList => {
            res.status(200).json(projectList)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Could not complete request' })
        })
})

//Post Projects
router.post('/', validatePost, (req, res) => {
    const projectPost = { ...req.body, id: req.params.id }

    Projects.insert(projectPost).then(projectPosted => {
        res.status(201).json(projectPosted)
    })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Could not complete request'
            })
        })
})

//Edit Project
router.put('/:id', (req, res) => {
    Projects.update(req.params.id, req.body).then(updateProject => {
        if (updateProject) {
            res.status(200).json(updateProject)
        }
    })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: "Could not complete request" })
        })
})

//Delete Project
router.delete("/:id", validatePost, (req, res) => {
    Projects.remove(req.params.id).then(projectRemoved => {
        res.status(200).json(projectRemoved)
    })
})



//MW
function validatePost(req, res, next) {

    const { description } = req.body

    if (!req.body) {
        res.status(400).json({ message: "missing post data" })
    }
    if (!description) {
        res.status(400).json({ message: "missing required description field" })
    }
    next()
}

module.exports = router