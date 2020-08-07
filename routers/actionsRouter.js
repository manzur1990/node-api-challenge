const express = require('express')

const router = express.Router()

const Actions = require('../data/helpers/actionModel', validateId)

//Get Actions
router.get('/', (req, res) => {
    Actions.get()
        .then((logs) => {
            res.status(200).json(logs)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Could not complete request' })
        })
})

//Post Action
router.post('/', (req, res) => {
    const actionPost = { ...req.body, id: req.params.id }
    Actions.insert(actionPost)
        .then(actionPosted => {
            res.status(201).json(actionPosted)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Could not complete request'
            })
        })
})

//Edit Action
router.put('/:id', (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(editAction => {
            res.status(200).json(editAction)

        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Could not complete request' })
        })
})

//Delete Action
router.delete("/:id", (req, res) => {
    Actions.remove(req.params.id).then(count => {
        res.status(200).json(count)
    })
})

//MW
function validateId(req, res, next) {
    const { id } = req.params
    Actions.get(id)
        .then(action => {
            if (action) {
                req.action = action
                next()
            } else {
                res.status(404).json({
                    message: 'Project not found'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: `There was a problem with your ${req.method} request`
            })
        })
}

module.exports = router