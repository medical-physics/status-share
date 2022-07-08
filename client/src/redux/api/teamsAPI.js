import axios from 'axios';

export const getTeams = async () => {
  const data = await axios.get('/teams');
  return data.json();
};

export const addTeam = async (newTeam) => {
  const data = await axios.post('/team', newTeam);
  return data.json();
};

export const updateTeam = async (teamId, teamData) => {
  const data = await axios.post(`/team${teamId}`, teamData);
  return data.json();
};

export const deleteTeam = async (teamId) => {
  const data = await axios.delete(`/team/${teamId}`);
  return data.json();
};
