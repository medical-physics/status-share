import axios from 'axios'

export const getUsers = async () => {
  const data = await axios.get('/users')
  return data.json()
}

export const postStatusUpdate = async (userId, statusData) => {
  const data = await axios.post(`/user/status/${userId}`, statusData)
  return data.json()
}

export const updateUserPresence = async (userId, presence) => {
  const data = await axios.post(`/user/presence/${userId}`, { present: presence })
  return data.json()
}

export const updateUserProfile = async (profileData) => {
  const data = await axios.post(`/user/${profileData.userId}`, profileData)
  return data.json()
}

export const addOneUser = async (newUserData) => {
  const data = await axios.post('/user', newUserData)
  return data.json()
}

export const deleteOneUser = async (userId) => {
  const data = await axios.delete(`/user/${userId}`)
  return data.json()
}
