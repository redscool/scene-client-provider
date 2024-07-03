import React from 'react';
import LottieView from 'lottie-react-native';

export default function ButtonLoader({style}) {
  return (
    <LottieView
      style={style}
      source={require('../assets/animations/app_loader.json')}
      autoPlay
      loop
    />
  );
}
