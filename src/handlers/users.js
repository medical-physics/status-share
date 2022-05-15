const User = require("../models/user");

// Fetch one user
exports.getUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findOne({ _id: userId });

        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
    }
};

// Create one user
exports.postOneUser = async (req, res) => {
    const newUser = {
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        team: req.body.team,
        teamId: req.body.teamId,
        status: "",
        statusTime: new Date().toString(),
        present: true,
        memo: "",
        priority: req.body.priority,
        userId: "",
        unreadMessages: 1
    };

    try {
        const user = await User.create({ ...newUser });

        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
    }
};
