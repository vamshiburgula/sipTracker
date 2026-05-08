const express = require('express')

const {
    createInvestor,
    getInvestor,
    getInvestorHoldings,
    getInvestorNetworth,
    login,
    logout
} = require('../controllers/investorController.js')

const router = express.Router()

router.post('/login', login)

router.post('/logout', logout)

router.post('/', createInvestor)

router.get('/:investorId/holdings', getInvestorHoldings)

router.get('/:investorId/networth', getInvestorNetworth)

router.get('/:investorId', getInvestor)


module.exports = router