import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import fonts from '../config/fonts';
import NormalText from '../components/NormalText';
import QRScanner from '../components/QRScanner';
import routes from '../navigation/routes';
import TextButton from '../components/TextButton';
import {useService} from '../../context';
import {showToast} from '../components/widgets/toast';
import {setSecureItem} from '../utils/storage';
import {SECURE_STORAGE_KEY} from '../config/constants';

const StaffLogin = ({navigation}) => {
  const {request} = useService();
  const {navigate} = navigation;
  const [qrValue, setQrValue] = useState();
  useEffect(() => {
    console.log("=====" + qrValue)
  }, [qrValue])
  const handleLogin = async () => {
    if (!qrValue) return;
    try {
      const res = await request('post', '/api/auth/organiser/stafflogin', {
        qrValue,
      });
      showToast('Login Successful.');
      await setSecureItem(SECURE_STORAGE_KEY.EVENT_ID, qrValue);
      navigation.reset({
        index: 0,
        routes: [{name: routes.HOME_STAFF}],
      });
    } catch (e) {
      // TODO: erro handling
      showToast('Something went wrong.');
    }
  };
  useEffect(() => {
    handleLogin();
  }, [qrValue]);
  return (
    <View style={styles.container}>
      <NormalText
        text="Scan QR to join as staff from your Organiser’s app."
        style={styles.text}
      />
      <View style={styles.button}>
        <TextButton
          fontStyle={styles.buttonText}
          onPress={() => navigate(routes.HOME_STAFF)}
          title="Need Help?"
        />
      </View>
      <QRScanner setQrValue={setQrValue} style={styles.qRScanner} />
    </View>
  );
};

export default StaffLogin;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: '80%',
  },
  buttonText: {
    fontFamily: fonts[400],
    fontSize: 12,
  },
  container: {
    flex: 1,
  },
  qRScanner: {
    alignSelf: 'center',
    marginTop: 50,
  },
  text: {
    alignSelf: 'center',
    marginTop: 40,
    width: '80%',
  },
});
