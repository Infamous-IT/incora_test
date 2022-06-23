const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require("../config/db");
const helper = require("../controllers/helper");

class AuthController {
    async register(req, res) {
        if (!helper.isValidEmail(req.body.email)) {
            return res.status(400).send({'message': 'Please enter a valid email address'});
        }
        if (!helper.isValidPhone(req.body.phone)) {
            return res.status(400).send({'message': 'Please enter a valid phone number'});
        }
        if (!helper.isValidFirstName(req.body.first_name)) {
            return res.status(400).send({'message': 'Please enter a valid first name'});
        }
        if (!helper.isValidLastName(req.body.last_name)) {
            return res.status(400).send({'message': 'Please enter a valid last name'});
        }

        const hashPassword = helper.hashPassword(req.body.password);

        try {
            const {rows} = await pool.query('INSERT INTO users (first_name, last_name, email, phone, password) VALUES ($1, $2, $3, $4, $5)',
                [req.body.first_name, req.body.last_name, req.body.email, req.body.phone, hashPassword]);
            const token = helper.generateToken(rows[0].user_id);
            return res.status(201).send({token});
        } catch (error) {
            if (error.routine === '_bt_check_unique') {
                return res.status(400).send({ 'message': 'User with that EMAIL already exist' });
            }
            return res.status(400).send(error);
        }
    }

    async login(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({'message': 'Some values are missing!'});
        }
        if (!helper.isValidEmail(req.body.email)) {
            return res.status(400).send({'message': 'Please enter a valid email address'});
        }

        try {
            const {rows} = await pool.query("SELECT * FROM users WHERE email = $1", [req.body.email]);
            if (!rows[0]) {
                return res.status(400).send({'message': 'The credentials you provided is incorrect'});
            }
            if (!helper.comparePassword(rows[0].password, req.body.password)) {
                return res.status(400).send({'message': 'The credentials you provided is incorrect'});
            }

            const token = helper.generateToken(rows[0].user_id);
            return res.status(200).send({token});
        } catch (error) {
            console.error({'message': 'Login with this EMAIL and PASSWORD failed!'});
        }
    }
}

module.exports = new AuthController();