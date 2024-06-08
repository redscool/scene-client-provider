import {Pressable, StyleSheet} from 'react-native';
import React from 'react';

import colors from '../config/colors';
import Icon from '../Icons';

const UploadImageCard = ({onPress, style}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <Icon color={colors.secondary} name="plus" size={24}/>
    </Pressable>
  );
};

export default UploadImageCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.medium,
    borderRadius: 8,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
});
