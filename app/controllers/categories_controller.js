const express = require('express');
//const app = express(); -- we will not use app becoz it has 76 property in it we don't want to use them all, that's why we will use router method like get,post etc and router has 6 properties
const router = express.Router();
//npm install --save mongodb
const { ObjectID } = require('mongodb');

const { Category } = require('../models/category');

// express middleware function
const validateId = (req, res, next) => {
	let id = req.params.id;
	//id =123
	if (!ObjectID.isValid(id)) {
		res.send({
			notice: 'invalid object id'
		});
	} else {
		next();
	}
};
//localhost:3000/categories/
router.get('/', function(req, res) {
	Category.find()
		.then(function(categories) {
			res.send(categories);
		})
		.catch(function(err) {
			res.send(err);
		});
});

//localhost:3000/categories/id

router.get('/:id', validateId, function(req, res) {
	let id = req.params.id;
	Category.findById(id)
		.then(function(category) {
			res.send(category);
		})
		.catch(function(err) {
			res.send(err);
		});
});

//post localhost:3000/categories
router.post('/', function(req, res) {
	let body = req.body;
	let c = new Category(body);
	//console.log(c);
	c
		.save()
		.then(function(category) {
			res.send(category);
		})
		.catch(function(err) {
			res.send(err);
		});
});

//put localhost:3000/categories/id
router.put(':/id', validateId, function(req, res) {
	let id = req.params.id;
	let body = req.body;
	Category.findByIdAndUpdate(id, { $set: body }, { new: true })
		.then(function(category) {
			res.send(category);
		})
		.catch(function(err) {
			res.send(err);
		});
});

router.delete('/:id', validateId, function(req, res) {
	let id = req.params.id;
	Category.findByIdAndDelete(id)
		.then(function(category) {
			res.send({
				notice: 'Successfully deleted record'
			});
		})
		.catch(function(err) {
			res.send(err);
		});
});

module.exports = {
	categoriesController: router
};
