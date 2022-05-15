const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppMetadata = require("../models/appMetadata");
const Credential = require("../models/credential");
const { validateLoginData } = require("../util/validators");

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
        res.status(500).send({ message: err.message });
    }
};

exports.getCredentials = (req, res) => {
    try {
        Credential.find({}, (err, credentials) => {
            if (err) throw err;
            res.status(201).json(credentials);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
};

// Log in
exports.login = (req, res) => {
    try {
        const inputCred = {
            email: req.body.email,
            password: req.body.password
        };
        const { valid, errors } = validateLoginData(inputCred);

        if (!valid) return res.status(400).json(errors);

        Credential.findOne({ email: inputCred.email }, (err, credential) => {
            if (err || credential.password !== inputCred.password) {
                res.status(403).send({ general: "Wrong credentials, please try again." });
            }

            const token = jwt.sign(
                { credentialId: credential._id, email: inputCred.email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h"
                }
            );

            res.status(200).json({ token });
        });
    } catch (err) {
        console.error(err);
        res.status(403).send({ general: "Wrong credentials, please try again." });
    }
};

// Fetch name on top bar
exports.getAppName = (req, res) => {
    try {
        AppMetadata.find({}, (err, data) => {
            if (err || !data) {
                res.status(404).json({ error: "App name not found." });
            }

            res.status(200).json({ appName: data[0].appName });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.code });
    }
};

exports.setAppName = async (req, res) => {
    try {
        const doc = await AppMetadata.findOne();

        doc.appName = req.body.appName;
        doc.save();

        return res.status(200).json(doc);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.code });
    }
};
