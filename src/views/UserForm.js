import React, {useState} from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';
import {Input, Button, Avatar} from 'react-native-elements';
import {addUser, deleteUser, updateUser} from '../redux/reducers';
import {connect} from 'react-redux';

const UserForm = ({route, navigation, updateUser, deleteUser, addUser}) => {
  const [user, setUser] = useState(
    route.params.mode === 'ADD'
      ? {name: '', email: '', avatarUrl: ''}
      : route.params,
  );

  const defaultImage =
    'https://rickandmortyapi.com/api/character/avatar/19.jpeg';

  const handleSaveUser = () => {
    addUser(user);
    navigation.goBack();
  };

  const handleDelete = () => {
    deleteUser(user.id);
    navigation.goBack();
  };

  const handleUpdate = () => {
    updateUser(user);
    navigation.goBack();
  };
  const checkFormValid = () => {
    const isValidUser =
      !!user.name.trim() && !!user.email.trim() && !!user.avatarUrl.trim();
		const isFormValid = isValidUser === false;
		return isFormValid
  };
  const renderAddButton = () => {
    return (
      <View style={{padding: 4}}>
        <Button
          onPress={() => handleSaveUser()}
          disabled={checkFormValid()}
          type="outline"
          title="Create New User"></Button>
      </View>
    );
  };

  const renderDeleteEditButton = () => {
    return (
      <View style={styles.actionContainer}>
        <View style={{flex: 1, padding: 4}}>
          <Button
            type="outline"
            title="Delete"
            buttonStyle={{borderColor: 'red'}}
            titleStyle={{color: 'red'}}
            onPress={() => handleDelete()}
          />
        </View>
        <View style={{flex: 1, padding: 4}}>
          <Button
						onPress={() => handleUpdate()}
						disabled={checkFormValid()}
            type="outline"
            title="Update"
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content"></StatusBar>
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Avatar
            rounded
            source={{uri: !user.avatarUrl ? defaultImage : user.avatarUrl}}
            size={150}
          />
        </View>
      </View>
      <View style={{justifyContent: 'space-around'}}>
        <Input
          placeholder="Name"
          value={user ? user.name : ''}
          onChangeText={(name) => setUser({...user, name: name})}
        />
        <Input
          placeholder="Email"
          value={user ? user.email : ''}
          onChangeText={(email) => setUser({...user, email: email})}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          placeholder="Avatar Url"
          onChangeText={(url) => {
            console.log(url);
            return setUser({...user, avatarUrl: url.trim()});
          }}
          value={user.avatarUrl}
        />
      </View>
      {route.params.mode == 'ADD'
        ? renderAddButton()
        : renderDeleteEditButton()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapDispatchToProps = {
  updateUser,
  deleteUser,
  addUser,
};

export default connect(null, mapDispatchToProps)(UserForm);
