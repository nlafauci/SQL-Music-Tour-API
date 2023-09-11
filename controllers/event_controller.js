// DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { event } = db 
const { Op } = require('sequelize')
   
// FIND ALL eventS
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})


// FIND A SPECIFIC event
events.get('/:id', async (req, res) => {
    try {
        const foundevent = await Event.findOne({
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
        const updatedEvents = await event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A event
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = events