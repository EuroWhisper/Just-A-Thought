var Thought = require('../models/thought');

// Retrieve all thoughts from the database.
exports.getAllThoughts = function(req, res) {
	Thought.find(function(err, thoughts) {
		res.json(thoughts);
	});
}

exports.getHashtagThoughts = function(req, res) {
	Thought.find({hashTags: req.params.hashTag}, function(err, thoughts) {
		res.json(thoughts);
	});
}

// Create and save a new Thought object
exports.createThought = function(req, res) {
	console.log(req.body);
	
	// Use Regex to detect hashtags.
	let hashTags = req.body.thought.match(/#(?:\[[^\]]+\]|\S+)/g);
	// Strip the hash symbol from each hashtag prior to storage.
	let rawTags = hashTags.map(function(tag) {
		return tag.slice(1);
	});
	
	// Create a new Thought object from the POST data.
	var thought = new Thought({
		name: req.body.name,
		thought: req.body.thought,
		hashTags: rawTags
	});
	
	console.log(thought.hashtags);
	
	// Save the new thought.
	thought.save(function(err) {
		if(err) {return next(err);}
		// Reuse getAllThoughts() to return updated collection of thoughts & prevent duplicate code
		exports.getAllThoughts(req, res);
	});
}