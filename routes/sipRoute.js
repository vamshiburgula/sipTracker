const express = require('express')

const {
    createSIPController,
    getSIPController,
    processSIPController,
    getTransactionsController
} = require('../controllers/sipController')

const router = express.Router()

router.post('/', createSIPController)

router.get('/:sipId', getSIPController)

router.post('/:sipId/process', processSIPController)

router.get('/:sipId/transactions', getTransactionsController)

module.exports = router