const Team = require("../models/team");

exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find({});

        res.status(200).json(teams);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
};

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
        team.save();

        res.status(200).json(team);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
};
