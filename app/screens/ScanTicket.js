import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import fonts from '../config/fonts';
import NormalText from '../components/NormalText';
import QRScanner from '../components/QRScanner';
import TextButton from '../components/TextButton';
import routes from '../navigation/routes';
import {showToast} from '../components/widgets/toast';
import {useService} from '../../context';

const ScanTicket = ({navigation, route}) => {
  const {requestWithAccessToken} = useService();

  const {navigate} = navigation;

  const eventId = route.params._id;

  const [qrcode, setQrCode] = useState();

  const handleSubmit = async () => {
    if (!qrcode) return;
    try {
      const userId = qrcode.substr(0, 24);
      const ticketId = qrcode.substr(24, 24);

      console.log(userId);
      console.log(ticketId);
      const res = await requestWithAccessToken('post', '/api/app/event/scanTicket/', {
        eventId,
        ticketId,
        userId,
      });
      console.log(res);
    } catch (e) {
      // TODO: error handling
      showToast('Invalid Ticket');
      console.log(e);
      return;
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [qrcode]);

  return (
    <View style={styles.container}>
      <View style={styles.warningContainer}>
        <NormalText text="Ask Attendee to show the ticket. " />
        <TextButton
          fontStyle={styles.buttonText}
          onPress={() => navigate(routes.VALID_TICKET)}
          title="Need Help?"
        />
      </View>
      <QRScanner setQrValue={setQrCode} style={styles.qRScanner} />
    </View>
  );
};

export default ScanTicket;

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: fonts[400],
    fontSize: 12,
  },
  container: {
    flex: 1,
  },
  qRScanner: {
    alignSelf: 'center',
  },
  warningContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    width: '90%',
  },
});
