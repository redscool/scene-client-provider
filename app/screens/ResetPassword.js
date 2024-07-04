import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';

import AppButton from '../components/AppButton.js';
import Input from '../components/Input.js';
import LockImage from '../components/LockImage.js';
import routes from '../navigation/routes.js';
import useService from '../../context/service.js';
import {showToast} from '../components/widgets/toast.js';

const ResetPassword = ({navigation, route}) => {
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const resetToken = route.params.resetToken;

  const {request} = useService();

  const [loading, setLoading] = useState();

  const handleReset = async () => {
    if (cpassword !== password) {
      showToast('Password and Confirm password are different');
      return;
    }
    setLoading(true);
    const data = await request('post', '/api/auth/organiser/resetPassword', {
      password,
      resetToken,
    });
    setLoading(false);
    if (data?.error) {
      showToast('Something went wrong.');
    } else {
      showToast('Password Reset Successfully.');
      navigation.reset({
        index: 0,
        routes: [{name: routes.LOGIN}],
      });
    }
  };
  return (
    <View style={styles.container}>
      <LockImage style={styles.logo} />
      <Input
        label={'Password'}
        placeholder={'Placeholder'}
        setState={setPassword}
        state={password}
        style={styles.input}
      />
      <Input
        label={'Confirm Password'}
        placeholder={'Placeholder'}
        setState={setCpassword}
        state={cpassword}
        style={styles.input}
      />
      <AppButton
        active={!loading}
        fontStyle={styles.buttonText}
        onPress={handleReset}
        solid
        style={styles.button}
        title="Reset Password"
      />
    </View>
  );
};

export default ResetPassword;

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
    marginBottom: 20,
  },
  logo: {
    alignSelf: 'center',
    marginVertical: 50,
  },
});
