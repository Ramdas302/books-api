// Transaction Logs

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Books = new Schema({
	"title": {
		type: String
	},
	"author": {
		type: String
	},
	"summary": {
		type: String
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Books', Books);