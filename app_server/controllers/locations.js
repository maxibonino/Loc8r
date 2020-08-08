/* Получить (GET) домашнюю страницу */
module.exports.homelist = function(req, res, next) {
  res.render('index', { title: 'Home' });
};

// Информация о местоположении
module.exports.locationInfo = function(req, res, next) {
  res.render('index', { title: 'Location Info' });
}

// Страница отзыва
moduke.exports.addReview = function(req, res, next) {
  res.render('index', { title: 'Add review' });
}