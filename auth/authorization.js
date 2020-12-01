const jwt = require('jsonwebtoken');
const { Bearer } = require('permit');

const permit = new Bearer();

const jwtSecret = process.env.JWT_SECRET;

exports.authorize = async (req, res, next) => {
	try {
		const token = permit.check(req);
		if (!token) {
			return res
				.status(401)
				.json({ success: false, msg: 'Authentication is required' });
		}
		const payload = jwt.verify(token, jwtSecret);
		console.log(payload);
	} catch (err) {
		res.status(400).json({});
	}
};
