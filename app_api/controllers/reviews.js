var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

// mockup function
var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.reviewsReadOne = function (req, res, next) {
    if (req.params && req.params.locationid && req.params.reviewid) {
        Loc
            .findById(req.params.locationid)
            .select('name reviews')
            .exec(function(err, location) {
                var response, review;
                if (!location) {
                    sendJsonResponse(res, 404, { "message" : "Location id not found" });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                console.log(location.reviews);
                if (location.reviews && location.reviews.length > 0) {
                    console.log(location);
                    review = location.reviews.id(req.params.reviewid);
                    if (!review) {
                        sendJsonResponse(res, 404, { "message" : "reviewid not found" });
                        return;
                    } else {
                        response = {
                            location : {
                                name : location.name,
                                id : req.params.locationid
                            },
                            review : review
                        };
                        sendJsonResponse(res, 200, response);
                    }
                } else {
                    sendJsonResponse(res, 404, { "message" : "No reviews found" });
                }
            });
    } else {
        sendJsonResponse(res, 404, { "message" : "Not found, locationid and reviewid are both required"});
    }
};