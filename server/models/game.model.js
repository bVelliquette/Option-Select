var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var gameSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    developer: {type: String, required: true},
    publisher: {type: String, required: true}
});

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;