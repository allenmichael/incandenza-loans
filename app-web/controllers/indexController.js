module.exports.main = (req, res, next) => {
	res.render('pages/index', { title: "Box Reference App" });
}