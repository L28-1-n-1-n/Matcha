const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @description Get All Itmes
// @access Public

// below is at root since we are already at models/Item directory
// If we are at server.js and using app.get, we would have to put in full path
router.get('/', (req, res) => {
    Item.find()
        // sory bt descending date
        .sort({date : -1})
        // return promise
        .then(items => res.json(items))
});


// @route POST api/items
// @description Create an Item
// @access Public

// below is at root since we are already at models/Item directory
// If we are at server.js and using app.get, we would have to put in full path
router.post('/', (req, res) => {
    const newItem = new Item({
        name : req.body.name //bodyParser allows us to do this
    });

    newItem.save().then(item => res.json(item)); // save memory created to database
    //res.json(item) spit out that item in JSON
});



// @route DELETE api/items/:id
// @description Delete an Item
// @access Public

// below is at root since we are already at models/Item directory
// If we are at server.js and using app.get, we would have to put in full path
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id) // fetch id from URL
    .then(item => item.remove().then(() => res.json({success: true}))) // found item, then remove it, send back promise
    .catch(err => res.status(404).json({success: false})); // Not Found error
});


module.exports = router;