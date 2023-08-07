const cron = require('node-cron');
const Box = require('./models/Box')
const User = require('./models/User')

let disableReserve = false
exports.getDisableReserve = () => {
    return disableReserve
}
const setDisableReserve = (val) => {
    console.log(val ? 'blocking reserve request' : 'reopened reserve request')
    disableReserve = val
}
exports.setDisableReserve = setDisableReserve

exports.weeklyReserveUpdate = () => {
    const job = cron.schedule('* * */3 * * *', async () => {
        console.log('prepare for weekly update')
        await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));
        console.log('weekly update started')
        setDisableReserve(true)
        try {
            for (let room = 1; room <= 3; room++) {
                for (let period = 1; period <= 112; period++) {
                    const newBox = await Box.findOne({ period: period, room: room, week: 2 })
                    const updateResultThisweek = await Box.updateOne({ period: period, room: room, week: 1 }, { $set: { "status": newBox.status, "user": newBox.user } })
                    const updateResultNextweek = await Box.updateOne({ period: period, room: room, week: 2 }, { $set: { 'status': 'Available', 'user': '' } })
                }
            }
            const updateResultUser = await User.updateMany({}, { $set: { 'times': 7 } })
            console.log('done weekly update')
        } catch (err) {
            console.log(err)
        }
        setDisableReserve(false)
    })
}

exports.checkEnabled = (req, res, next) => {
    if (!disableReserve) {
        next()
    } else {
        res.status(409).send()
    }
}