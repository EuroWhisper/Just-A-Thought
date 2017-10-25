var mongoose = require('mongoose');

var Schema = mongoose.Schema;

function validateHashTagLength(hashTags) {
	if (!hashTags == null) {
		for(tag of hashTags) {
			if(tag.length > 100) {
				return false;
			}
		}
	}
	return true;
}

function validateNumOfHashTags(hashTags) {
	if (hashTags.length <= 5) {
		return true;
	} else {
		return false;
	}
}

var validateHashTags = [{
	validator: validateHashTagLength,
	msg: "Hashtag has exceeded character limit."
}, {
	validator: validateNumOfHashTags,
	msg: "Number of hashtags per thought post has been exceeded."
}];
	
	

var ThoughtSchema = Schema(
	{
		name: {type: String, required: true, maxlength: 50},
		thought: {type: String, required: true, maxlength: [150, 'Thought must not exceed 150 characters.']},
		hashTags: {type: Array, required: true, validate: validateHashTags},
		likes: {type: Number, required: false},
		dislikes: {type: Number, required: false}
	}
);





module.exports = mongoose.model('Thought', ThoughtSchema);