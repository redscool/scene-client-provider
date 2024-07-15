import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import AppButton from '../components/AppButton';
import colors from '../config/colors';
import EventCard from '../components/EventCard';
import fonts from '../config/fonts';
import SectionHeading from '../components/SectionHeading';
import routes from '../navigation/routes';
import useEvents from '../../context/event';
import ButtonLoader from '../components/ButtonLoader';

const HomeOrganiser = ({navigation}) => {
  const {navigate} = navigation;
  const {events} = useEvents();
  const {getEvents} = useEvents();

  const [eventLoading, setEventLoading] = useState();

  const init = async () => {
    setEventLoading(true);
    await getEvents();
    setEventLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome</Text>
      <SectionHeading style={{marginTop: 20}} title={`Good Morning`} />
      <AppButton
        active
        fontStyle={styles.buttonText}
        onPress={() => navigate(routes.ADD_EVENT)}
        solid
        style={styles.button}
        title="Add Event"
      />
      <SectionHeading style={{marginTop: 36}} title="Your Events" />
      {eventLoading ? (
        <ButtonLoader style={styles.loader} />
      ) : (
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
      )}
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
  loader: {
    alignSelf: 'center',
    height: 180,
    width: 180,
  },
});
