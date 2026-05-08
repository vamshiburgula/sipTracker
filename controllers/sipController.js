const {
    createSIP,
    getSIP,
    processSIP,
    getTransactions
} = require('../models/sipModel')

const createSIPController = async (req, res) => {

    try {

        const result = await createSIP(req.body)

        return res.status(201).json(result)

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getSIPController = async (req, res) => {

    try {

        const result = await getSIP(req.params.sipId)

        if (!result) {

            return res.status(404).json({
                success: false,
                message: 'SIP not found'
            })
        }

        return res.json(result)

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const processSIPController = async (req, res) => {

    try {

        const result = await processSIP({
            sip_id: req.params.sipId,
            transaction_id: req.body.transaction_id,
            transaction_amount: req.body.transaction_amount,
            transaction_type: req.body.transaction_type,
            transaction_date: req.body.transaction_date
        })

        return res.json(result)

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getTransactionsController = async (req, res) => {

    try {

        const result = await getTransactions(req.params.sipId)

        return res.json(result)

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    createSIPController,
    getSIPController,
    processSIPController,
    getTransactionsController
}