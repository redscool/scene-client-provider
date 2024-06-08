import {FlatList, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';

import ListItem from '../components/ListItem';
import routes from '../navigation/routes';
import {getSecureItem, removeSecureItem} from '../utils/storage';
import {SECURE_STORAGE_KEY, STORAGE_KEY} from '../config/constants';
import {ServiceContext} from '../../context/ServiceContext';

const Profile = ({navigation}) => {
  const serviceObject = useContext(ServiceContext);
  const {navigate} = navigation;
  const handleLogout = () => {
    removeSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN);
    removeSecureItem(SECURE_STORAGE_KEY.REFRESH_TOKEN);
    removeSecureItem(STORAGE_KEY.EMAIL);
    removeSecureItem(STORAGE_KEY.USER_ID);
    navigation.reset({
      index: 0,
      routes: [{name: routes.LOGIN}],
    });
  };

  const handleChangePassword = async () => {
    const email = await getSecureItem(STORAGE_KEY.EMAIL);
    const data = await serviceObject.request(
      'post',
      '/api/auth/organiser/forgotPassword',
      {email},
    );
    if (data?.error) {
      // TODO: error handling
      console.log('error');
    } else {
      navigate(routes.CONFIRM_EMAIL, {email});
    }
  };

  const options = [
    {
      id: 1,
      icon: 'venue',
      onPress: () => navigate(routes.ADD_VENUE),
      value: 'Add Venue',
    },
    {
      id: 2,
      icon: 'venue',
      onPress: () => navigate(routes.EDIT_VENUE),
      value: 'Edit Venue',
    },
    {
      id: 3,
      icon: 'account',
      onPress: handleChangePassword,
      value: 'Change Password',
    },
    {
      id: 4,
      icon: 'powerOff',
      onPress: handleLogout,
      value: 'Log out',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        renderItem={({item, index}) => (
          <ListItem
            icon={item.icon}
            onPress={item.onPress}
            style={{alignSelf: 'center', marginTop: 16, width: '95%'}}
            value={item.value}
          />
        )}
        keyExtractor={item => item.id}
        style={styles.options}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  options: {
    alignSelf: 'center',
    marginTop: 24,
  },
});
