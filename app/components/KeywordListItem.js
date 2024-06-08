import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import fonts from '../config/fonts';
import Icon from '../Icons';

const KeywordListItem = ({fontStyle, keyword, onPress, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, fontStyle]}>{keyword}</Text>
      <Pressable style={styles.icon} onPress={onPress}>
        <Icon name={'cross'} color={colors.text} size={12} />
      </Pressable>
    </View>
  );
};

export default KeywordListItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 18,
    width: '80%',
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 30,
  },
  text: {
    color: colors.text,
    fontFamily: fonts[500],
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
