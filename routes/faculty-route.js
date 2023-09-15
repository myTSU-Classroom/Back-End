const express = require('express')
const router = express.Router()
const { Faculty } = require('../models/faculty-model')

router.get('/', async (req, res) => {
    try {
        const faculty = await Faculty.find()

        if(faculty.length === 0) {
            return res.status(404).json({
                error: true,
                message: 'Faculty not found.'
            })
        }
        return res.status(200).json(faculty)
    } catch (err) {
        return res.status(400).json({
            error: true,
            message: err.message
        })
    }
})

module.exports = router