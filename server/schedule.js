const cron = require('node-cron');
const User = require('./models/User')
const Box = require('./models/Box')

let disableReserve = false
exports.getDisableReserve = () => {
    return disableReserve
}
const setDisableReserve = (val) => {
    console.log('set')
    disableReserve = val
}
exports.setDisableReserve = setDisableReserve

exports.weeklyReserveUpdate = () => {
    const job = cron.schedule('*/1 * * * *', async () => {
        console.log('prepare for weekly update')
        await new Promise(resolve => setTimeout(resolve, 3000));
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
            console.log('done weekly update')
        } catch (err) {
            console.log(err)
        }
        setDisableReserve(false)
    })
}

exports.test = () => {
    const job = cron.schedule('*/10 * * * * *', () => {
        disableReserve = !disableReserve
        console.log(disableReserve)
    })
}