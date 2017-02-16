module.exports.main = (req, res, next) => {
	res.render('pages/about', { title: "About" });
}