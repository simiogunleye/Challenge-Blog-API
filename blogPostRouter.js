const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models')

//add contect so there's data to look at
BlogPosts.create('First blog post', 'This is my blog entry', 'Simi Ogunleye', '05/17/2018');
BlogPosts.create('Second blog post', 'This is another blog entry', 'Simi Ogunleye', '05/18/2018');

//send back JSON representation of all blog entries on GET requests to root
router.get('/blog-posts', (req, res) => {
	res.json(BlogPosts.get());
});

//when new blog is added, ensure it has required fields
// (title, content, author, publishDate)
//if not, log error and return 400 status code with message.
//If okay, add new item, and return it with a 201 status
router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author', 'publishDate'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const post = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
	res.status(201).json(post)
});

//delete posts by id
router.delete('/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted blog post \`${req.params.ID}\``); //why is ID capitalized
	res.status(204).end();
});

// when PUT request comes in with updated blog, ensure it has
// required fields. also ensure that blog id in url path, and
// blog id in updated blog object match. if problems with any
// of that, log error and send back status code 400. otherwise
// call `BlogPosts.update` with updated blog.
router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author', 'id'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	if (req.params.id !== req.body.id) {
		const message = (
			`Request path id (${req.params.id}) and request body id `
			`(${req.body.id}) must match`);
		console.error(message);
		return res.status(400).send(message);
	} 
	console.log(`Updating shopping list item \`${req.params.id}\``);
	const updatedItem = BlogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishDate: req.body.publishDate,
	});
	res.status(204).end();
});

module.exports = router;
























