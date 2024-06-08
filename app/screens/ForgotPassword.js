import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import AppButton from '../components/AppButton.js';
import Input from '../components/Input.js';
import LockImage from '../components/LockImage.js';
import routes from '../navigation/routes.js';
import useService from '../../context/ServiceContext.js';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const {navigate} = navigation;

  const {request} = useService();

  const handleForgotPassword = async () => {
    const data = await request('post', '/api/auth/organiser/forgotPassword', {
      email,
    });
    if (data?.error) {
      // TODO: error handling
      console.log('error');
    } else {
      navigate(routes.CONFIRM_EMAIL, {email});
    }
  };
  return (
    <View style={styles.container}>
      <LockImage style={styles.logo} />
      <Input
        label={'Email'}
        placeholder={'Placeholder'}
        setState={setEmail}
        state={email}
        style={styles.input}
      />
      <AppButton
        fontStyle={styles.buttonText}
        onPress={handleForgotPassword}
        solid
        style={styles.button}
        title="Forgot Password"
      />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    height: 29,
    marginTop: 80,
    width: 178,
  },
  buttonText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  input: {
    alignSelf: 'center',
  },
  logo: {
    alignSelf: 'center',
    marginVertical: 50,
  },
});
