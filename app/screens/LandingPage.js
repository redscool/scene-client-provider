import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Logo from '../components/Logo';
import fonts from '../config/fonts';
import { getSecureItem } from '../utils/storage';
import routes from '../navigation/routes';
import { SECURE_STORAGE_KEY } from '../config/constants';
import useAppConfig from '../../context/appConfig';
import useAuth from '../../context/auth';
import { requestTrackingPermission } from 'react-native-tracking-transparency';

const LandingPage = ({ navigation }) => {
  const { getCities, getEventTags, getTypes, getVenueTags } = useAppConfig();
  const { setAuth } = useAuth();

  const initApp = async () => {
    await getCities();
    await getEventTags();
    await getTypes();
    await getVenueTags();

    const trackingStatus = await requestTrackingPermission();
    if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {}

    const accessToken = await getSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN);

    if (accessToken) {
      await setAuth();
      navigation.reset({
        index: 0,
        routes: [{ name: routes.HOME_ORGANISER }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: routes.LOGIN }],
      });
    }
  };

  useEffect(() => {
    initApp();
  }, []);

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.textContainer}>
        <Text style={styles.text}>from {'\n'}BaljeetKode</Text>
      </View>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts[600],
    fontSize: 14,
    textAlign: 'center',
  },
  textContainer: {
    marginBottom: 80,
    marginTop: 'auto',
  },
});
