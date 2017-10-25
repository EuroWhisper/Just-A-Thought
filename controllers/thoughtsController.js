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
exports.createThought = function(req, res, next) {
	console.log(req.body);
	
	// Use Regex to detect hashtags.
	var hashTags = req.body.thought.match(/#(?:\[[^\]]+\]|\S+)/g);
	var strippedTags;
	// Strip hash symbols from each hashtag prior to storage, if hashtags are detected.
	if (hashTags !== null) {
		// Strip the hash symbol from each hashta.
		strippedTags = hashTags.map(function(tag) {
			return tag.slice(1);
		});
		console.log(strippedTags);
	// Else add "general" as the tag.
	} else {
		strippedTags = "uncategorized";
	}
	
	
	// Create a new Thought object from the POST data.
	var thought = new Thought({
		name: req.body.name,
		thought: req.body.thought,
		hashTags: strippedTags
	});
	
	console.log(thought.hashTags);

	// Save the new thought.
	thought.save(function(err) {
		if(err) {
			console.log("error!");
			return res.json(err);
		}
		// Reuse getAllThoughts() to return updated collection of thoughts & prevent duplicate code
		exports.getAllThoughts(req, res);
	});
}