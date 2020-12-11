import React, {useEffect} from 'react';
import {StatusBar, FlatList} from 'react-native';
import UserListItem from '../components/UserList/UserListItem';
import {connect} from 'react-redux';
import {fetchUsers} from '../redux/reducers';
import {createSelector} from '@reduxjs/toolkit';

const UserList = ({navigation, fetchUsers, users}) => {
  useEffect(() => {
    fetchUsers();
  }, []);

  const renderUserListItem = ({item: user}) => {
    return (
      <UserListItem
        id={user.id}
        title={user.name}
        subtitle={user.email}
        avatarUrl={user.avatarUrl}
        navigation={navigation}
      />
    );
  };
  return (
    <>
      <StatusBar barStyle="light-content"></StatusBar>
      <FlatList
        data={users}
        renderItem={renderUserListItem}
        keyExtractor={(user) => {
			return user.id.toString()
		}}
      />
    </>
  );
};

const users = (state) => state.users;

const getUsersFromState = createSelector([users], (users) => {
  return users;
});

const mapStateToProps = (state) => ({
  users: getUsersFromState(state),
});

const matchDispatchToProps = {
  fetchUsers,
};

export default connect(mapStateToProps, matchDispatchToProps)(UserList);
