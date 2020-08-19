/* Получить (GET) домашнюю страницу */
module.exports.homelist = function(req, res, next) {
  res.render('locations-list', { title: 'Home' });
};

// Информация о местоположении
module.exports.locationInfo = function(req, res, next) {
  res.render('location-info', { title: 'Location Info' });
}

// Страница отзыва
module.exports.addReview = function(req, res, next) {
  res.render('index', { title: 'Add review' });
}