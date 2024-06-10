import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';

import ListItem from '../components/ListItem';
import routes from '../navigation/routes';

const EventOptions = ({navigation, route}) => {
  const event = route.params;
  const {navigate} = navigation;
  const options = [
    {
      id: 1,
      icon: 'ticket',
      onPress: () => navigate(routes.SCAN_TICKET, event),
      value: 'Scan Ticket',
    },
    {
      id: 2,
      icon: 'ticket',
      onPress: () => navigate(routes.PREVIEW_EVENT, {event}),
      value: 'Preview Event',
    },
    {
      id: 3,
      icon: 'ticket',
      onPress: () => navigate(routes.EDIT_EVENT, event),
      value: 'Edit Event',
    },
    {
      id: 4,
      icon: 'ticket',
      onPress: () => navigate(routes.INVITE_STAFF, {event}),
      value: 'Invite Staff',
    },
    {
      id: 5,
      icon: 'ticket',
      onPress: () => navigate(routes.SCAN_TICKET, event),
      value: 'Need Help?',
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

export default EventOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  options: {
    alignSelf: 'center',
    marginTop: 24,
  },
});
