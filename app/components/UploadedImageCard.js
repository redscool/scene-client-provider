import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';

import colors from '../config/colors';
import Icon from '../Icons';
import {getFileUrl} from '../utils/misc';

const UploadedImageCard = ({image, onPress, style}) => {
  return (
    <View onPress={onPress} style={[styles.container, style]}>
      {onPress && (
        <Pressable onPress={onPress} style={styles.button}>
          <Icon color={colors.white} name="cross" size={8} />
        </Pressable>
      )}
      <Image
        resizeMode="contain"
        source={{
          uri: getFileUrl(`${image}`),
        }}
        loadingIndicatorSource={require('../assets/animations/loading.gif')}
        style={styles.image}
      />
    </View>
  );
};

export default UploadedImageCard;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.grey,
    borderRadius: 8,
    height: 16,
    justifyContent: 'center',
    position: 'absolute',
    right: 2,
    top: 2,
    width: 16,
    zIndex: 1,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.medium,
    borderRadius: 8,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  image: {
    borderRadius: 8,
    height: 64,
    width: 64,
  },
});
