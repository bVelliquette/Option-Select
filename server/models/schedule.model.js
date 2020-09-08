var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schedSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    location: String,
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    dailySchedule: [{
        day: {type: Date, required: true},
        channels: [{
            name: {type: String, required: true},
            link: {type: String, required: true},
            blocks: [{
                name: {type: String, required: true},
                description: String,
                startTime: {type: Date, required: true},
                endTime: {type: Date, required: true},
                game: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Game'
                }
            }]
        }]
    }]
});


var Schedule = mongoose.model('Schedule', schedSchema);

module.exports = Schedule;