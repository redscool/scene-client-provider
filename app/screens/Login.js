import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import AppButton from '../components/AppButton.js';
import Input from '../components/Input.js';
import routes from '../navigation/routes.js';
import {SECURE_STORAGE_KEY, STORAGE_KEY} from '../config/constants.js';
import {setSecureItem} from '../utils/storage.js';
import {showToast} from '../components/widgets/toast.js';
import TextButton from '../components/TextButton.js';
import useService from '../../context/ServiceContext.js';
import VerifyImage from '../components/VerifyImage.js';

const Login = ({navigation}) => {
  const {navigate} = navigation;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {request} = useService();

  const handleLogin = async () => {
    const data = await request('post', '/api/auth/organiser/login', {
      email,
      password,
    });
    if (data?.error) {
      // TODO: HandleError
      console.log(data);
      showToast('Invalid Credentials!');
    } else {
      const {accessToken, refreshToken, userId} = data;
      setSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN, accessToken);
      setSecureItem(SECURE_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
      setSecureItem(STORAGE_KEY.USER_ID, userId);
      setSecureItem(STORAGE_KEY.EMAIL, email);
      navigation.reset({
        index: 0,
        routes: [{name: routes.HOME_ORGANISER}],
      });
    }
  };
  return (
    <View style={styles.container}>
      <VerifyImage style={styles.logo} />
      <Input
        label={'Email'}
        placeholder={'Placeholder'}
        setState={setEmail}
        state={email}
        style={styles.input}
      />
      <Input
        label={'Password'}
        placeholder={'Placeholder'}
        secureTextEntry={true}
        setState={setPassword}
        state={password}
        style={[styles.input, {marginTop: 36}]}
      />
      <AppButton
        fontStyle={styles.buttonText}
        onPress={handleLogin}
        solid
        style={styles.button}
        title="Login"
      />
      <TextButton
        onPress={() => navigate(routes.FORGOT_PASSWORD)}
        style={styles.forgotPasswordButton}
        title={'Forgot Password'}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    height: 29,
    marginTop: 80,
    width: 155,
  },
  buttonText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  forgotPasswordButton: {
    alignSelf: 'center',
    marginVertical: 30,
  },
  input: {
    alignSelf: 'center',
  },
  logo: {
    alignSelf: 'center',
    marginVertical: 50,
  },
});
