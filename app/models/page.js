var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = new Schema({
	name: String,
    client_id: String,
    zones: []
}, { timestamps: true });

module.exports = mongoose.model('Page', PageSchema);