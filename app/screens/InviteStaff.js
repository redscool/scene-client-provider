import React from 'react';
import {StyleSheet, View} from 'react-native';
import QRgenerator from '../components/QRGenerator';
import NormalText from '../components/NormalText';
import TextButton from '../components/TextButton';
import fonts from '../config/fonts';

function InviteStaff({route}) {
  const eventId = route.params.event._id;
  console.log(eventId);
  return (
    <View style={styles.container}>
      <View style={styles.note}>
        <NormalText
          fontStyle={styles.fontStyle}
          text={'Ask Staff to scan the QR Code.'}
        />
        <TextButton fontStyle={styles.fontStyle} title={'Need Help?'} />
      </View>
      <View style={styles.QRContainer}>
        <QRgenerator QRvalue={eventId} />
      </View>
    </View>
  );
}

export default InviteStaff;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  fontStyle: {
    fontFamily: fonts[400],
    fontSize: 12,
  },
  note: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '80%',
    marginTop: 50,
    justifyContent: 'center',
  },
  QRContainer: {
    marginTop: 50,
  },
});
