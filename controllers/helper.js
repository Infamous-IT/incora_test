const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Helper {
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    }

    comparePassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
    }

    isValidEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    isValidPhone(phone) {
        return /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone);
    }

    isValidFirstName(first_name) {
        return /^[a-zA-Z]+$/.test(first_name);
    }

    isValidLastName(last_name) {
        return /^[a-zA-Z]+$/.test(last_name);
    }

    generateToken(id) {
        const token = jwt.sign({
                user_id: id
            },
            process.env.SECRET, { expiresIn: '7d' }
        );
        return token;
    }
}

module.exports = new Helper();