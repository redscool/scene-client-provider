import {StyleSheet, View} from 'react-native';
import React from 'react';

import fonts from '../config/fonts';
import NormalText from '../components/NormalText';
import QRScanner from '../components/QRScanner';
import TextButton from '../components/TextButton';
import routes from '../navigation/routes';

const ScanTicket = ({navigation}) => {
  const {navigate} = navigation;
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
      <QRScanner style={styles.qRScanner} />
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
