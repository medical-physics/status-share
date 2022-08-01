import { store } from '../../redux/store/store';
import {
  insertUserFromStream,
  deleteUserFromStream,
  updateUserFromStream
} from '../../redux/slices/usersSlice';
import {
  insertTeamFromStream,
  deleteTeamFromStream,
  updateTeamFromStream
} from '../../redux/slices/teamsSlice';

export const handleUsersStreamChange = (data) => {
  switch (data.operationType) {
    case 'insert':
      store.dispatch(insertUserFromStream(data.fullDocument));
      break;
    case 'delete':
      store.dispatch(deleteUserFromStream(data.documentKey._id));
      break;
    case 'update':
      store.dispatch(updateUserFromStream({
        _id: data.documentKey._id,
        updatedFields: data.updateDescription.updatedFields
      }));
      break;
    default:
      break;
  }
};

export const handleTeamsStreamChange = (data) => {
  switch (data.operationType) {
    case 'insert':
      store.dispatch(insertTeamFromStream(data.fullDocument));
      break;
    case 'delete':
      store.dispatch(deleteTeamFromStream(data.documentKey._id));
      break;
    case 'update':
      store.dispatch(updateTeamFromStream({
        _id: data.documentKey._id,
        updatedFields: data.updateDescription.updatedFields
      }));
      break;
    default:
      break;
  }
};
