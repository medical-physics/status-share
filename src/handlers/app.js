const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Credential = require("../models/credential");

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);

        const credential = await Credential.create({
            email: email.toLowerCase(),
            password: encryptedPassword
        });

        const token = jwt.sign(
            { credentialId: credential._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h"
            }
        );

        credential.token = token;
        credential.save();

        res.status(201).json(credential);
    } catch (err) {
        console.error(err);
    }
}
