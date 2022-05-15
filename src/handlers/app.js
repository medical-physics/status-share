const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppMetadata = require("../models/appMetadata");
const Credential = require("../models/credential");
const { validateLoginData } = require("../util/validators");

// Use this route when creating new credentials
// Only email and password are required in the req body
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
                expiresIn: "3h"
            }
        );

        credential.token = token;
        credential.save();

        return res.status(201).json(credential);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
    }
};

// Log in
exports.login = async (req, res) => {
    try {
        const inputCred = {
            email: req.body.email,
            password: req.body.password
        };
        const { valid, errors } = validateLoginData(inputCred);

        if (!valid) return res.status(400).json(errors);

        const credential = await Credential.findOne({ email: inputCred.email });
        if (credential.password !== inputCred.password) {
            return res.status(403).send({ general: "Wrong credentials, please try again." });
        }

        const token = jwt.sign(
            { credentialId: credential._id, email: inputCred.email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "3h"
            }
        );

        credential.token = token;
        credential.save();

        return res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        return res.status(403).send({ general: "Wrong credentials, please try again." });
    }
};

// Fetch name on top bar
exports.getAppName = (req, res) => {
    try {
        AppMetadata.find({}, (err, data) => {
            if (err || !data) {
                return res.status(404).json({ error: "App name not found." });
            }

            return res.status(200).json({ appName: data[0].appName });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.code });
    }
};

// Set new app name
exports.setAppName = async (req, res) => {
    try {
        const doc = await AppMetadata.findOne();

        doc.appName = req.body.appName;
        doc.save();

        return res.status(200).json(doc);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.code });
    }
};

// Refresh login
exports.refreshLogin = (req, res) => {
    
};
