const jwt = require('jsonwebtoken');
const pool = require("../config/db");

class Auth {
    async verifyToken(req, res, next) {
        const token = req.headers['x-access-token'];
        if(!token) {
            return res.status(400).send({ 'message': 'Token is not provided' });
        }
        try {
            const decoded = await jwt.verify(token, process.env.SECRET);
            const { rows } = await pool.query("SELECT * FROM users WHERE user_id = $1", [decoded.user_id]);
            if(!rows[0]) {
                return res.status(400).send({ 'message': 'The token you provided is invalid' });
            }
            req.users = { user_id: decoded.user_id };
            next();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

module.exports = new Auth();