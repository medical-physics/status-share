const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
    try {
        const { email, password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = {
            email: email.toLowerCase(),
            password: encryptedPassword
        };

        console.log(process.env.TOKEN_KEY);
        const token = jwt.sign(
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h"
            }
        );

        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
    }
}
