import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

function QRScanner({setQrValue, style}) {
  return (
    <View style={[styles.container, style]}>
      <QRCodeScanner
        containerStyle={{justifyContent: 'flex-start'}}
        cameraContainerStyle={{width: 256, height: 256, marginTop: 70}}
        cameraStyle={[styles.container]}
        onRead={e => setQrValue(e.data)}
      />
    </View>
  );
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
