const {
    insertFund,
    fetchFunds,
    updateFundNAV
} = require('../models/fundModel.js')

const createFund = async (req, res) => {

    try {

        const result = await insertFund(req.body)

        return res.status(201).json(result)

    } catch (err) {

        return res.status(500).send(err.message)
    }
}

const getFunds = async (req, res) => {

    try {

        const result = await fetchFunds()

        return res.json(result)

    } catch (err) {

        return res.status(500).send(err.message)
    }
}

const updateNAV = async (req, res) => {

    try {

        const result = await updateFundNAV({
            nav_id: req.body.nav_id,
            fund_id: req.params.fundId,
            nav_value: req.body.nav_value,
            nav_date: req.body.nav_date
        })

        return res.json(result)

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
module.exports = {
    createFund,
    getFunds,
    updateNAV
}