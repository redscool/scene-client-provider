import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import AppButton from '../components/AppButton';
import colors from '../config/colors';
import fonts from '../config/fonts';
import OTPInput from '../components/OtpInput';
import routes from '../navigation/routes';
import TextButton from '../components/TextButton';
import Timer from '../components/Timer';
import useService from '../../context/service';
import {showToast} from '../components/widgets/toast';

const OtpResetPassword = ({navigation, route}) => {
  const {navigate} = navigation;
  const [otp, setOtp] = useState('');

  const {request} = useService();

  const [loading, setLoading] = useState();

  const handleContinue = async () => {
    setLoading(true);
    const email = route.params.email;
    const data = await request('post', '/api/auth/organiser/verifyOtp', {
      otp,
      email,
    });
    if (data?.error) {
      // TODO: error handling
      console.log(data);
      showToast('Something went wrong.');
    } else {
      const {resetToken} = data;
      navigate(routes.RESET_PASSWORD, {resetToken});
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    const email = route.params.email;
    try {
      await request('post', '/api/auth/organiser/forgotPassword', {email});
      showToast('Otp sent successfully.');
    } catch (e) {
      // TODO: error handling
      showToast('Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Please enter OTP sent to email id: e@mail.com
      </Text>
      <View style={styles.inputContainer}>
        <OTPInput code={otp} length={4} setCode={setOtp} />
      </View>
      <Timer style={styles.timer} time={'00:29'} />
      <TextButton
        fontStyle={styles.resendText}
        style={styles.resend}
        title="Resend OTP"
        onPress={handleResendOtp}
      />
      <AppButton
        active={!loading}
        fontStyle={styles.buttonFont}
        onPress={handleContinue}
        solid
        style={styles.button}
        title="Continue"
      />
    </View>
  );
};

export default OtpResetPassword;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    height: 29,
    marginBottom: 80,
    marginTop: 'auto',
    width: 155,
  },
  buttonFont: {
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  icon: {
    marginLeft: 30,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 30,
    marginTop: 55,
    width: '100%',
    borderWidth: 1,
  },
  resend: {
    alignSelf: 'center',
    marginTop: 20,
  },
  resendText: {
    fontFamily: fonts[600],
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    color: colors.text,
    fontFamily: fonts[400],
    fontSize: 16,
    marginLeft: 30,
    marginTop: 40,
  },
  timer: {
    alignSelf: 'center',
    marginTop: 20,
  },
});
