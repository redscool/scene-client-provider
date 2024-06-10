import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useCameraDevice, useCameraPermission, } from 'react-native-vision-camera';

function QRScanner({ setQrValue, style }) {
  const device = useCameraDevice('front');
  const { hasPermission, requestPermission} = useCameraPermission()
  if (!hasPermission) requestPermission();
  if (!device) return <View>
    <Text style={{color: 'white'}}>NO Device</Text>
  </View>
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
  );
  // return (
  //   <View style={[styles.container, style]}>
  //     <QRCodeScanner
  //       containerStyle={{justifyContent: 'flex-start'}}
  //       cameraContainerStyle={{width: 256, height: 256, marginTop: 70}}
  //       cameraStyle={[styles.container]}
  //       onRead={e => setQrValue(e.data)}
  //     />
  //   </View>
  // );
}

export default QRScanner;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    borderRadius: 8,
    width: 256,
    height: 256,
  },
});
