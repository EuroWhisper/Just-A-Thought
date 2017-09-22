var Thought = require('../models/thought');

// Retrieve all thoughts from the database.
exports.getAllThoughts = function(req, res) {
	Thought.find(function (err, thoughts) {
		res.json(thoughts);
	});
}

// Create and save a new Thought object
exports.createThought = function(req, res) {
	console.log(req.body);
	// Create a new Thought object from the POST data.
	
	// Store a collection of hashtags detected from within req.body.thought
	let hashTags;
	
	var thought = new Thought({
		name: req.body.name,
		thought: req.body.thought
	});
	
	// Save the new thought.
	thought.save(function(err) {
		if(err) {return next(err);}
		// Reuse getAllThoughts() to return updated collection of thoughts & prevent duplicate code
		exports.getAllThoughts(req, res);
	});
}