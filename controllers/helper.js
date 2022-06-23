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
        return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(phone);
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