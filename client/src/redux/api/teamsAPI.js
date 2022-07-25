import axios from 'axios';

export const getTeams = async () => {
  const response = await axios.get('/teams');
  return response.data;
};

export const addTeam = async (newTeam) => {
  const response = await axios.post('/team', newTeam);
  return response.data;
};

export const updateTeam = async (teamId, teamData) => {
  const response = await axios.post(`/team/${teamId}`, teamData);
  return response.data;
};

export const deleteTeam = async (teamId) => {
  const response = await axios.delete(`/team/${teamId}`);
  return response.data;
};
