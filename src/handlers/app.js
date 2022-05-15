const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppMetadata = require("../models/appMetadata");
const Credential = require("../models/credential");
const { validateLoginData } = require("../util/validators");

// Use this route when creating new credentials
// Only email and (unencrypted) password are required in the req body
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

        const accessToken = jwt.sign(
            { credentialId: credential._id, email: inputCred.email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "3h"
            }
        );

        const refreshToken = jwt.sign(
            { credentialId: credential._id, email: inputCred.email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "30d"
            }
        );

        credential.token = accessToken;
        credential.save();

        return res.status(200).json({
            accessToken,
            refreshToken
        });
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

// Receive a refresh token and validate it (through auth middleware)
// If valid, create new access token
exports.refreshLogin = async (req, res) => {
    try {
        const credential = await Credential.findOne({ _id: req.user.credentialId });

        const accessToken = jwt.sign(
            { credentialId: credential._id, email: req.user.email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "3h"
            }
        );
        
        credential.token = accessToken;
        credential.save();

        return res.status(200).json({ accessToken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.code });
    }
};
