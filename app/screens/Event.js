import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import AppButton from '../components/AppButton';
import Carousel from '../components/Carousel';
import colors from '../config/colors';
import DetailItem from '../components/DetailItem';
import EventBanner from '../components/EventBanner';
import FavouriteButton from '../components/FavouriteButton';
import {
  convertTimeToHHMMFormat,
  getAddress,
  getEventFormattedDate,
  getFileUrl,
} from '../utils/misc';

import Heading from '../components/Heading';
import TextButton from '../components/TextButton';
import NormalText from '../components/NormalText';
import Subheading from '../components/Subheading';
import routes from '../navigation/routes';
import {useService} from '../../context';
import fonts from '../config/fonts';

const Event = ({route, navigation}) => {
  const {navigate} = navigation;
  const {request} = useService();

  const [event, setEvent] = useState({});

  const formattedDate = getEventFormattedDate(event?.startTime);
  const [state, setState] = useState(false);

  const init = async eventId => {
    const res = await request('get', '/api/app/event', {eventId});
    setEvent(res);
  };

  const handleViewMap = () => {
    const {lat, lng} = event.venueId?.location;
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${lat},${lng}`;
    const label = event.venueId?.abbreviation;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  useEffect(() => {
    const eventId = route.params.event._id;
    init(eventId);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      bounces={false}>
      <EventBanner
        imageUrl={getFileUrl(event?.bannerImage)}
        style={styles.eventBanner}
      />
      <Heading heading={event?.name} />

      <View style={styles.detailsContainer}>
        <DetailItem
          iconName="calendar"
          value={formattedDate}
          style={{marginBottom: 6}}
        />
        <DetailItem
          iconName="timer"
          value={`${convertTimeToHHMMFormat(
            new Date(event?.startTime),
          )} - ${convertTimeToHHMMFormat(new Date(event?.endTime))}`}
          style={{marginBottom: 6}}
        />
        <DetailItem
          iconName="location"
          value={`${event.venueId?.abbreviation}, ${getAddress(
            event.venueId?.address,
          )}`}
          style={{marginBottom: 6}}
        />
        <TextButton
          fontStyle={{
            fontSize: 12,
            fontFamily: fonts[600],
            textDecorationLine: 'underline',
          }}
          onPress={handleViewMap}
          style={{marginBottom: 10, marginLeft: 20}}
          title="View in Maps"
        />
        <DetailItem
          iconName="rupee"
          value={event.price === 0 ? 'FREE' : event.price}
          style={{marginBottom: 6}}
        />
      </View>
      <Subheading subheading="Gallery" />
      <Carousel slides={event?.gallery} style={styles.carousel} />
      <Subheading subheading="About" />
      <NormalText
        fontStyle={{paddingLeft: 10}}
        style={{alignSelf: 'center', width: '90%'}}
        text={event.about}
      />
      <Subheading subheading="Note" />
      <NormalText
        fontStyle={{paddingLeft: 10}}
        style={{alignSelf: 'center', width: '90%'}}
        text={event.note}
      />
      <Subheading subheading={`More at ${event.venueId?.abbreviation}`} />
      <TextButton
        fontStyle={{
          fontSize: 12,
          fontFamily: fonts[600],
          marginLeft: 10,
          textDecorationLine: 'underline',
        }}
        onPress={handleViewMap}
        title="Show Venue"
        style={{
          marginBottom: 70,
          marginLeft: 20,
          marginTop: 10,
          width: '90%',
        }}
      />
    </ScrollView>
  );
};

export default Event;

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: 'center',
    backgroundColor: colors.glass,
    bottom: 0,
    flexDirection: 'row',
    height: 56,
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  carousel: {
    marginVertical: 12,
  },
  container: {
    flex: 1,
  },
  detailsContainer: {
    height: 115,
    marginLeft: 30,
    width: '40%',
  },
  eventBanner: {
    alignSelf: 'center',
    marginTop: 10,
  },
  favouriteButton: {
    height: 35,
    marginLeft: 'auto',
    marginRight: 28,
  },
  registerButton: {
    height: 35,
    marginLeft: 28,
    marginRight: 'auto',
    width: '70%',
  },
  registerButtonFontStyle: {
    fontSize: 16,
  },
});
