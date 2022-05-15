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
        const team = await Team.create({
            color: "#ff5733",
            priority: 1,
            team: "Test Team"
        });

        team.save();
        res.status(200).json(team);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
};
