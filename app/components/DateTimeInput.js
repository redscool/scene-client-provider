import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import colors from '../config/colors';
import fonts from '../config/fonts';
import {
  convertDateToDDMMYYYYFormat,
  convertTimeToHHMMFormat,
} from '../utils/misc';

const DateTimeInput = ({ state, label, mode = 'date', setState, style }) => {
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setState(currentDate);
  };

  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputIOS}>
          <DateTimePicker
            testID="dateTimePicker"
            value={state}
            mode={mode}
            onChange={onChange}
          />
        </View>
      </View>
    )
  }
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.input} onPress={() => setShow(true)}>
        <Text style={styles.inputText}>
          {mode === 'date'
            ? convertDateToDDMMYYYYFormat(state)
            : convertTimeToHHMMFormat(state)}
        </Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={state}
            mode={mode}
            onChange={onChange}
          />
        )}
      </Pressable>
    </View>
  );
};

export default DateTimeInput;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: 50,
    width: '80%',
  },
  input: {
    backgroundColor: colors.secondary,
    borderRadius: 4,
    height: 28,
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 'auto',
    paddingHorizontal: 10,
  },
  inputIOS: {
    backgroundColor: colors.secondary,
    borderRadius: 4,
    height: 28,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 'auto',
    flexDirection: 'row',
  },
  inputText: {
    color: colors.medium,
    fontFamily: fonts[500],
    fontSize: 14,
    marginVertical: 'auto',
  },
  label: {
    color: colors.text,
    fontFamily: fonts[600],
    fontSize: 12,
    marginLeft: 10,
  },
});
