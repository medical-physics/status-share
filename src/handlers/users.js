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

// Update a user's details (excludes status, presence)
exports.updateUserDetails = async (req, res) => {
    const updatedUser = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        team: req.body.team,
        memo: req.body.memo,
        priority: req.body.priority
    };
    const userId = req.params.userId;

    try {
        const user = await User.findOne({ _id: userId });

        for (const key of Object.keys(updatedUser)) {
            user[key] = updatedUser[key];
        }
        await user.save();

        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
    }
};

// Update a user's memo
exports.updateUserMemo = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findOne({ _id: userId });
        user.memo = req.body.memo;
        await user.save();

        return res.status(200).json({ message: "User memo updated successfully." });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
    }
};

// Update a user's status
exports.updateUserStatus = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findOne({ _id: userId });
        user.status = req.body.status;
        user.statusTime = req.body.statusTime;
        await user.save();

        return res.status(200).json({ message: "User status updated successfully." });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
    }
};

// Update a user's presence
exports.updateUserPresence = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findOne({ _id: userId });
        user.present = req.body.present;
        await user.save();

        return res.status(200).json({ present: req.body.present });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
    }
};
