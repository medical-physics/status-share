const Team = require("../models/team");

// Fetch all teams
exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find({});

        res.status(200).json(teams);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
};

// Create a new team
exports.postOneTeam = async (req, res) => {
    try {
        const newTeam = {
            team: req.body.team,
            priority: req.body.priority,
            color: req.body.color,
            col1: req.body.col1,
            col2: req.body.col2,
            col3: req.body.col3
        };

        const team = await Team.create({ ...newTeam });
        await team.save();

        return res.status(200).json(team);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
    }
};

// Update a team's details
exports.updateTeam = async (req, res) => {
    const updatedTeam = {
        team: req.body.team,
        priority: req.body.priority,
        color: req.body.color,
        teamId: req.params.teamId,
        col1: req.body.col1,
        col2: req.body.col2,
        col3: req.body.col3
    };

    try {
        const team = await Team.findOne({ _id: updatedTeam.teamId });

        for (const key of Object.keys(updatedTeam)) {
            team[key] = updatedTeam[key];
        }
        await team.save();

        return res.status(200).json(team);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
    }
};
