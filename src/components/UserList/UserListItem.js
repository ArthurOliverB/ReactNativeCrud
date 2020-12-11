import React from 'react';
import {ListItem, Avatar, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'

export default ({id, title, subtitle, avatarUrl, navigation}) => {
	const user = {
		id,
		name: title, 
		email: subtitle,
		avatarUrl
	}
  return (
    <>
      <ListItem
        key={id}
        bottomDivider
        onPress={() => navigation.navigate('UserForm', user)}>
        <Avatar rounded source={{uri: avatarUrl}} />
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
          <ListItem.Subtitle>{subtitle}</ListItem.Subtitle>
        </ListItem.Content>
        <Icon name="ios-chevron-forward" size={25} color="gray" />
      </ListItem>
    </>
  );
};
