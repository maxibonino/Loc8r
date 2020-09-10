var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

// mockup function
var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.locationsCreate = function(req, res, next) {
    sendJsonResponse(res, 200, { "status" : "Created" });
};

module.exports.locationsListByDistance = function(req, res, next) {
    sendJsonResponse(res, 200, { "status" : "List by distance" });
};

module.exports.locationsReadOne = function(req, res, next) {
    if (req.params && req.params.locationid) {
        Loc
            .findById(req.params.locationid)
            .exec(function(err, location) {
                if (!location){
                    sendJsonResponse(res, 404, {"message" : "Location not found"});
                    console.log('location not found');
                    return;
                } else if (err) { 
                    sendJsonResponse(res, 404, err);
                    console.log('Smth error');
                    return;
                }
                sendJsonResponse(res, 200, location);
                console.log(location);
            });
    } else {
        sendJsonResponse(res, 404, { "message" : "No locationid in request" });
        console.log('No locationid in request');
    }
};

module.exports.locationsUpdateOne = function(req, res, next) {
    sendJsonResponse(res, 200, { "status" : "Update one" });
};

module.exports.locationsDeleteOne = function(req, res, next) {
    sendJsonResponse(res, 200, { "status" : "Delete one" });
};