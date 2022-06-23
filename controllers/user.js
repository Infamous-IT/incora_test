const pool = require("../config/db");
const helper = require("./helper");

class UserController {
    async getUsers(req, res) {
        try {
            const allUsers = await pool.query("SELECT * FROM users");
            res.json(allUsers.rows);
        } catch (error) {
            console.error(error);
        }
    }

    async getById(req, res) {
        try {
            const {id} = req.params;
            const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
            res.json(user.rows[0]);
        } catch (error) {
            console.error(error);
        }
    }

    async update(req, res) {
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
            const {id} = req.params;
            const {first_name, last_name, email, phone, password} = req.body;
            const updateUser = await pool.query("UPDATE users SET first_name= $1, last_name = $2, email= $3, phone= $4, password= $5  WHERE user_id = $6",
                [first_name, last_name, email, phone, hashPassword, id]);
            res.json('User was updated!');
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new UserController();