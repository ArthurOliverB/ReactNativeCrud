import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import UserList from './views/UserList';
import UserForm from './views/UserForm';
import {Button, Icon} from 'react-native-elements';
import {Provider} from 'react-redux';
import store from './redux/store';

const Stack = createStackNavigator();

export default (props) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="UserList"
          screenOptions={screenOptions}>
          <Stack.Screen
            name="UserList"
            component={UserList}
            options={({navigation}) => {
              return {
                title: 'User List',
                headerRight: () => (
                  <Button
                    onPress={() =>
                      navigation.navigate('UserForm', {mode: 'ADD'})
                    }
                    type="clear"
                    title=""
                    icon={<Icon name="add" size={25} color="white" />}
                  />
                ),
              };
            }}
          />
          <Stack.Screen
            name="UserForm"
            component={UserForm}
            options={{
              title: 'User Form',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const screenOptions = {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
