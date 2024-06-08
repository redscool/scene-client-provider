import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import AppButton from '../components/AppButton.js';
import colors from '../config/colors.js';
import fonts from '../config/fonts.js';
import VerifyImage from '../components/VerifyImage.js';

const ValidTicket = ({navigation}) => {
  const {navigate} = navigation;
  return (
    <View style={styles.container}>
      <VerifyImage style={styles.logo} />
      <Text style={[styles.text, {marginTop: 60}]}>Muhammad Siraj</Text>
      <Text style={[styles.text, {marginTop: 20}]}>Male, 24</Text>
      <AppButton
        fontStyle={styles.buttonText}
        solid
        style={styles.button}
        title="Okay"
      />
    </View>
  );
};

export default ValidTicket;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    height: 29,
    marginBottom: 80,
    marginTop: 'auto',
    width: 155,
  },
  buttonText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
    marginVertical: 50,
  },
  text: {
    alignSelf: 'center',
    color: colors.text,
    fontFamily: fonts[500],
    fontSize: 20,
  },
});
