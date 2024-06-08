import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import colors from '../config/colors';
import fonts from '../config/fonts';

const Logo = ({style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.logo}>
        LO<Text style={{color: colors.primary}}>GO</Text>
      </Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.medium,
    borderColor: colors.primary,
    borderRadius: 8,
    borderWidth: 0.5,
    elevation: 10,
    height: 128,
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {height: 8, width: 8},
    shadowOpacity: 1,
    shadowRadius: 10,
    width: 128,
  },
  logo: {
    color: colors.text,
    fontFamily: fonts[700],
    fontSize: 24,
  },
});
