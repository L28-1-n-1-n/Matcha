'use strict';

const Photo = require('../models/photo');

export.index = function(req, res) {
    Photo.find(photoId: req.params.photo_id)
}