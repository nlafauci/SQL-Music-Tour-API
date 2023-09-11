// DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
const { stage } = db 
const { Op } = require('sequelize')
   
// FIND ALL stageS
stages.get('/', async (req, res) => {
    try {
        const foundstages = await stage.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundstages)
    } catch (error) {
        res.status(500).json(error)
    }
})


// FIND A SPECIFIC stage
stages.get('/:id', async (req, res) => {
    try {
        const foundstage = await Stage.findOne({
            where: { stage_id: req.params.id }
        })
        res.status(200).json(foundstage)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A stage
stages.post('/', async (req, res) => {
    try {
        const newstage = await stage.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new stage',
            data: newstage
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A stage
stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A stage
stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = stages