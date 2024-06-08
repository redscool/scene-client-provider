import {Image, Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

import colors from '../config/colors';
import fonts from '../config/fonts';
import {getFileUrl} from '../utils/misc';

const UploadBanner = ({image, onPress, style, text}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      {image ? (
        <Image
          resizeMode="contain"
          source={{
            uri: getFileUrl(image),
          }}
          style={styles.image}
        />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </Pressable>
  );
};

export default UploadBanner;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.medium,
    borderRadius: 8,
    height: 125,
    justifyContent: 'center',
    width: '80%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  text: {
    color: colors.white,
    fontFamily: fonts[400],
    fontSize: 12,
  },
});
