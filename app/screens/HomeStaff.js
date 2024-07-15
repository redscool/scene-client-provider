import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import colors from '../config/colors';
import fonts from '../config/fonts';
import ListItem from '../components/ListItem';
import routes from '../navigation/routes';
import {getSecureItem, removeSecureItem, setSecureItem} from '../utils/storage';
import {SECURE_STORAGE_KEY} from '../config/constants';

const HomeStaff = ({navigation}) => {
  const {navigate} = navigation;

  const [eventId, setEventId] = useState();

  const init = async () => {
    const eventId = await getSecureItem(SECURE_STORAGE_KEY.EVENT_ID);
    setEventId(eventId);
    if (!eventId) {
      navigation.reset({
        index: 0,
        routes: [{name: routes.LOGIN_STAFF}],
      });
    }
  };

  const handleLogout = async () => {
    await removeSecureItem(SECURE_STORAGE_KEY.EVENT_ID);
    navigation.reset({
      index: 0,
      routes: [{name: routes.LOGIN}],
    });
  };

  useEffect(() => {
    init();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome</Text>
      <ListItem
        icon="ticket"
        onPress={() => navigate(routes.SCAN_TICKET, {_id: eventId})}
        style={{alignSelf: 'center', marginTop: 40}}
        value="Scan Ticker"
      />
      <ListItem
        icon="powerOff"
        onPress={handleLogout}
        style={{alignSelf: 'center', marginTop: 40}}
        value="Logout"
      />
    </View>
  );
};

export default HomeStaff;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    alignSelf: 'center',
    color: colors.text,
    fontFamily: fonts[600],
    fontSize: 24,
    marginTop: 50,
    width: '90%',
  },
});
