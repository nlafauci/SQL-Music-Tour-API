// DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { event } = db 
const { Op } = require('sequelize')
   
// FIND ALL eventS
events.get('/', async (req, res) => {
    try {
        const foundevents = await event.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundevents)
    } catch (error) {
        res.status(500).json(error)
    }
})


// FIND A SPECIFIC event
events.get('/:id', async (req, res) => {
    try {
        const foundevent = await event.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(foundevent)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A event
events.post('/', async (req, res) => {
    try {
        const newevent = await event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newevent
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A event
events.put('/:id', async (req, res) => {
    try {
        const updatedevents = await event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedevents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A event
events.delete('/:id', async (req, res) => {
    try {
        const deletedevents = await event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedevents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = events