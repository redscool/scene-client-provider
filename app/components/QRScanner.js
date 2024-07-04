import React, {useEffect, useState} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

function QRScanner({setQrValue, style}) {
  const device = useCameraDevice('back');
  const {requestPermission} = useCameraPermission();

  if (device == null)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{margin: 10}}>Camera Not Found</Text>
      </View>
    );

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      let value = codes[0]?.value;
      let type = codes[0]?.type;
      setQrValue(value);
    },
  });

  const handleCameraPermission = async () => {
    const granted = await requestPermission();
    if (!granted) {
      alert(
        'Camera permission is required to use the camera. Please grant permission in your device settings.',
      );
      Linking.openSettings();
    }
  };

  useEffect(() => {
    handleCameraPermission();
  }, []);

  return (
    <View style={[styles.container, style]}>
      <Camera
        codeScanner={codeScanner}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
    </View>
  );
}

export default QRScanner;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    width: 256,
    height: 256,
    marginTop: 40,
  },
});
