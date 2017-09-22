var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ThoughtSchema = Schema(
	{
		name: {type: String, required: true, max: 50},
		thought: {type: String, required: true, max: 100},
		hashTags: {type: Array, required: false},
		likes: {type: Number, required: false},
		dislikes: {type: Number, required: false}
	}
);

module.exports = mongoose.model('Thought', ThoughtSchema);