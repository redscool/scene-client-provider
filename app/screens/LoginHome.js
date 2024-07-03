import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import fonts from '../config/fonts';
import ListItem from '../components/ListItem';
import Logo from '../components/Logo';
import routes from '../navigation/routes';

const LoginHome = ({navigation}) => {
  const {navigate} = navigation;

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />
      <ListItem
        fontStyle={{fontSize: 16}}
        gradient
        icon={'account'}
        onPress={() => navigate(routes.LOGIN_ORGANISER)}
        style={{marginTop: 120}}
        value={'Organiser Login'}
      />
      <ListItem
        fontStyle={{fontSize: 16}}
        gradient
        icon={'ticket'}
        onPress={() => navigate(routes.LOGIN_STAFF)}
        style={{marginTop: 40}}
        value={'Staff Login'}
      />
      <View style={styles.bottomContainer}>
        <Text style={styles.text}>
          By continuing, you agree to our{' '}
          <Text style={[styles.text, {color: colors.primary}]}>
            Terms & Conditions
          </Text>{' '}
          and{' '}
          <Text style={[styles.text, {color: colors.primary}]}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginHome;

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 'auto',
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    marginTop: 120,
  },
  text: {
    color: colors.text,
    fontFamily: fonts[400],
    fontSize: 10,
  },
});
