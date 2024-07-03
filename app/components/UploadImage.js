import {Modal, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import AppButton from './AppButton';
import colors from '../config/colors';
import {showToast} from './widgets/toast';

import useService from '../../context/service';
import useCamera from '../hooks/useCamera';
import ButtonLoader from './ButtonLoader';

const UploadImage = ({limit, open, setOpen, setImage}) => {
  const {requestFileServer, requestWithAccessToken} = useService();
  const cameraGranted = useCamera();

  const [loading, setLoading] = useState();

  const handleAssets = async assets => {
    setLoading(true);
    if (assets) {
      const imagesArray = [];
      for (let element of assets) {
        const formData = new FormData();
        const {fileName, uri, type, fileSize} = element;
        formData.append('file', {
          name: fileName,
          type,
          uri,
        });
        try {
          const {key, url} = await requestWithAccessToken(
            'post',
            '/api/file/image/',
            {mimetype: type, size: fileSize},
          );
          // TODO: error handling
          await requestFileServer(
            url,
            element,
            type,
            () => console.log('Success'),
            () => showToast('Something went wrong.'),
          );
          console.log(key);
          imagesArray.push(key);
        } catch (e) {
          console.log(e);
          showToast('Something went wrong.');
          return;
        }
      }
      if (limit > 1) setImage(imagesArray);
      else setImage(imagesArray[0]);
    }
    setLoading(false);
    setOpen(false);
  };

  const handleCamera = async () => {
    const options = {
      storageOptions: {
        path: 'image',
      },
      quality: 0.2,
    };
    await launchCamera(options, async response => {
      const {assets} = response;
      await handleAssets(assets);
    });
  };

  const handleGallery = async () => {
    if (!limit) limit = 1;
    const options = {
      storageOptions: {
        path: 'image',
      },
      selectionLimit: limit,
    };
    await launchImageLibrary(options, async response => {
      const {assets} = response;
      await handleAssets(assets);
    });
  };
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => setOpen(false)}
      transparent
      visible={open}>
      {loading ? (
        <ButtonLoader style={styles.loader} />
      ) : (
        <>
          <Pressable onPress={() => setOpen(false)} style={styles.overlay} />
          <View style={styles.modal}>
            <AppButton active onPress={handleCamera} title={'Camera'} />
            <AppButton active onPress={handleGallery} title={'Gallery'} />
          </View>
        </>
      )}
    </Modal>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    margin: 'auto',
  },
  modal: {
    alignItems: 'center',
    backgroundColor: colors.dark,
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-around',
    marginBottom: 0,
    marginTop: 'auto',
    width: '100',
  },
  overlay: {
    flex: 1,
  },
});
