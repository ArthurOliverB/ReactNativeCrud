import {createSlice} from '@reduxjs/toolkit';

import {
  createNewUser,
  deleteUserById,
  fetchAllUsers,
  updateUserById,
} from '../api/users.api';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    usersFetched: (state, action) => {
      state = action.payload;
      return state;
    },
    userAdded: (state, action) => {
      state.push(action.payload);
      return state;
    },
    userDeleted: (state, action) => {
      state = state.filter((user) => user.id !== action.payload);
      return state;
    },
    userUpdated: (state, action) => {
      return state.map((u) => {
        if (u.id === action.payload.id) {
          u = action.payload;
        }
        return u;
      });
    },
  },
});

export const fetchUsers = () => {
  return (dispatch) => {
    fetchAllUsers().then(({data}) => {
      dispatch(usersFetched(data));
    });
  };
};

export const addUser = (newUser) => {
  return async (dispatch) => {
    const response = await createNewUser({id: Date.now(), ...newUser});
    dispatch(userAdded(response.data));
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    await deleteUserById(id);
    dispatch(userDeleted(id));
  };
};

export const updateUser = (updatedUser) => {
  console.log('Pre Reducer');
  console.log('updateUser');
  console.log(updatedUser);
  return async (dispatch) => {
    try {
      await updateUserById(updatedUser);
      dispatch(userUpdated(updatedUser));
    } catch (error) {
      console.log(error);
    }
  };
};

export const {
  usersFetched,
  userAdded,
  userDeleted,
  userUpdated,
} = usersSlice.actions;

export default usersSlice.reducer;
