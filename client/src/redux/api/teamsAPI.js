import axios from "axios";

export const getTeams = async () => {
    const data = await axios.get("/teams");
    return data.json();
};

export const addTeam = async (newTeam) => {
    const data = await axios.post("/team", newTeam);
    return data.json();
};
