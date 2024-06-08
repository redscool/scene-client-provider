import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import AppButton from '../components/AppButton';
import colors from '../config/colors';
import EventCard from '../components/EventCard';
import fonts from '../config/fonts';
import {getSecureItem} from '../utils/storage';
import SectionHeading from '../components/SectionHeading';
import {STORAGE_KEY} from '../config/constants';
import routes from '../navigation/routes';
import useService from '../../context/ServiceContext';

const HomeOrganiser = ({navigation}) => {
  const {navigate} = navigation;
  const [events, setEvents] = useState([]);

  const {requestWithAccessToken} = useService();

  const init = async () => {
    const creatorId = await getSecureItem(STORAGE_KEY.USER_ID);
    const res = await requestWithAccessToken('get', '/api/app/event/events', {
      creatorId,
    });
    setEvents(res);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome</Text>
      <SectionHeading style={{marginTop: 20}} title={`Good Morning`} />
      <AppButton
        fontStyle={styles.buttonText}
        onPress={() => navigate(routes.ADD_EVENT)}
        solid
        style={styles.button}
        title="Add Event"
      />
      <SectionHeading style={{marginTop: 36}} title="Your Events" />
      <FlatList
        data={events}
        nestedScrollEnabled
        renderItem={({item}) => (
          <EventCard
            event={item}
            onPress={() => navigate(routes.EVENT_OPTIONS, item)}
            style={{alignSelf: 'center', marginTop: 30}}
          />
        )}
        style={{marginBottom: 10, marginTop: 10}}
      />
    </View>
  );
};

export default HomeOrganiser;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    height: 29,
    marginTop: 36,
    width: 155,
  },
  buttonText: {
    fontSize: 16,
  },
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
