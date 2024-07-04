import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import AppButton from '../components/AppButton';
import colors from '../config/colors';
import Dropdown from '../components/DropDown';
import fonts from '../config/fonts';
import Icon from '../Icons';
import Input from '../components/Input';
import KeywordListItem from '../components/KeywordListItem';
import Map from '../components/Map';
import NormalText from '../components/NormalText';
import routes from '../navigation/routes';
import {showToast} from '../components/widgets/toast';
import Subheading from '../components/Subheading';
import TextButton from '../components/TextButton';
import UploadBanner from '../components/UploadBanner';
import UploadedImageCard from '../components/UploadedImageCard';
import UploadImage from '../components/UploadImage';
import UploadImageCard from '../components/UploadImageCard';

import useService from '../../context/service';
import useAppConfig from '../../context/appConfig';

const AddVenue = ({navigation}) => {
  const {requestWithAccessToken} = useService();
  const {cities, types, venueTags} = useAppConfig();

  const [bannerImage, setBannerImage] = useState();
  const [name, setName] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [type, setType] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState();
  const [gallery, setGallery] = useState([]);
  const [logo, setLogo] = useState();
  const [filtersArray, setFiltersArray] = useState(
    new Array(venueTags.length).fill(false),
  );
  const [keywords, setKeywords] = useState([]);

  const setImagesArrayHandler = array => {
    const temp = [...gallery, ...array];
    setGallery(temp);
  };

  const deleteImage = deleteIndex => {
    gallery.splice(deleteIndex, 1);
    setGallery([...gallery]);
  };

  const tagClickHandler = index => {
    const temp = [...filtersArray];
    temp[index] = !temp[index];
    setFiltersArray(temp);
  };

  const addKeywordHandler = () => {
    if (!keywordInput) {
      // TODO: error handling
      showToast('empty');
      return;
    }
    const temp = keywords;
    setKeywords([...temp, keywordInput]);
    setKeywordInput('');
  };

  const removeKeywordHandler = index => {
    const temp = keywords;
    temp.splice(index, 1);
    setKeywords([...temp]);
  };

  const [keywordInput, setKeywordInput] = useState('');
  const [open, setOpen] = useState(false);
  const [uploadType, setUploadType] = useState();
  const [showMap, setShowMap] = useState(false);
  const [galleryTilesArray, setGalleryTilesArray] = useState();

  const [loading, setLoading] = useState();

  const uploadTypes = {
    BannerImage: {
      setImage: setBannerImage,
    },
    LogoImage: {
      setImage: setLogo,
    },
    Images: {
      setImage: setImagesArrayHandler,
      limit: 20,
    },
  };

  const handleMaps = () => {
    setShowMap(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (
      !city ||
      !bannerImage ||
      !name ||
      !abbreviation ||
      !type ||
      !city ||
      !address ||
      !location ||
      !gallery ||
      !logo
    ) {
      showToast('Please Enter All the Details.');
      setLoading(false);
      return;
    }
    const tags = [];
    for (let i = 0; i < filtersArray.length; i++)
      if (filtersArray[i]) tags.push(Object.values(venueTags)[i].code);
    const data = {
      bannerImage,
      name,
      abbreviation,
      type: type?.code,
      city: city.code,
      address,
      location,
      gallery,
      logo,
      keywords,
      tags,
    };
    // TODO: error handling
    try {
      const resp = await requestWithAccessToken('post', '/api/app/venue', data);
      showToast('Venue added for approval.');
      navigation.reset({
        index: 0,
        routes: [{name: routes.HOME_ORGANISER}],
      });
    } catch (e) {
      showToast('Something went wrong.');
    }
    setLoading(false);
  };

  useEffect(() => {
    const temp = [{}, ...gallery];
    if (temp.length % 3 === 2) temp.push({id: temp.length, type: 'space'});
    setGalleryTilesArray(temp);
  }, [gallery]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Modal
        visible={showMap}
        animationType="slide"
        onRequestClose={() => setShowMap(false)}>
        <Map
          setAddress={setAddress}
          setSelected={setLocation}
          setVisible={setShowMap}
        />
      </Modal>
      {open && (
        <UploadImage
          limit={uploadTypes[uploadType].limit}
          open={open}
          setImage={uploadTypes[uploadType].setImage}
          setOpen={setOpen}
        />
      )}
      <UploadBanner
        onPress={() => {
          setOpen(true);
          setUploadType('BannerImage');
        }}
        text="Banner Image"
        image={bannerImage}
        style={styles.uploadBanner}
      />
      <Input
        label="Name"
        placeholder="Placeholder"
        setState={setName}
        state={name}
        style={{marginTop: 30}}
      />
      <Input
        label="Abbreviation"
        placeholder="Placeholder"
        setState={setAbbreviation}
        state={abbreviation}
        style={{marginTop: 16}}
      />
      <Dropdown
        data={Object.values(types)}
        label="Type"
        onSelect={setType}
        placeholder={'Placeholder'}
        style={{marginTop: 16}}
      />
      <Dropdown
        data={Object.values(cities)}
        label="City"
        onSelect={setCity}
        placeholder={'Placeholder'}
        style={{marginTop: 16}}
      />
      <Input
        label="Address"
        placeholder="Placeholder"
        setState={setAddress}
        state={address}
        style={{marginTop: 16}}
      />
      <Subheading subheading="Location" />
      <TextButton
        fontStyle={styles.mapText}
        onPress={handleMaps}
        style={styles.map}
        title="Change in Maps"
      />
      <Subheading subheading="Gallery" />
      <NormalText
        style={styles.normalText}
        text="Add photos to be visible on image gallery"
      />
      <ScrollView
        alwaysBounceVertical={false}
        directionalLockEnabled={true}
        contentContainerStyle={{
          width: '100%',
          padding: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imagesList}>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          contentContainerStyle={{
            width: '100%',
          }}
          data={galleryTilesArray}
          ItemSeparatorComponent={<View style={{height: 20}} />}
          keyExtractor={item => item.id}
          numColumns={3}
          renderItem={({item, index}) =>
            index === 0 ? (
              <UploadImageCard
                onPress={() => {
                  setOpen(true);
                  setUploadType('Images');
                }}
              />
            ) : item.type === 'space' ? (
              <View style={{height: 64, width: 64}} />
            ) : (
              <UploadedImageCard
                onPress={() => deleteImage(index - 1)}
                image={item}
              />
            )
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}
        />
      </ScrollView>
      <Subheading subheading="Logo" />
      <View style={styles.logoContainer}>
        {logo ? (
          <UploadedImageCard image={logo} onPress={() => setLogo(null)} />
        ) : (
          <UploadImageCard
            onPress={() => {
              setOpen(true);
              setUploadType('LogoImage');
            }}
          />
        )}
      </View>
      <Subheading subheading="Add Tags" />
      <FlatList
        data={Object.values(venueTags)}
        keyExtractor={item => item}
        numColumns={3}
        renderItem={({item, index}) => (
          <AppButton
            active
            fontStyle={{
              fontSize: 10,
              fontFamily: filtersArray[index] ? fonts[600] : fonts[300],
            }}
            onPress={() => tagClickHandler(index)}
            solid={filtersArray[index]}
            style={{margin: 8, height: 28, width: 94}}
            title={item.title}
          />
        )}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{marginVertical: 10, alignSelf: 'center'}}
      />
      <Subheading subheading="Keywords" />
      <NormalText
        fontStyle={{fontSize: 10}}
        style={styles.normalText}
        text="Add relevant keywords to improve your search ranking"
      />
      <FlatList
        data={keywords}
        keyExtractor={item => item}
        renderItem={({item, index}) => (
          <KeywordListItem
            fontStyle={{marginLeft: 10}}
            keyword={item}
            onPress={() => removeKeywordHandler(index)}
            style={{alignSelf: 'center'}}
          />
        )}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={{height: 5}} />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.addKeyword}>
        <Input
          placeholder={'Placeholder'}
          setState={setKeywordInput}
          state={keywordInput}
          style={{width: '75%'}}
        />
        <Pressable onPress={addKeywordHandler} style={styles.addButton}>
          <Icon name="plus" size={16} color={colors.text} />
        </Pressable>
      </View>
      <AppButton
        active={!loading}
        fontStyle={styles.buttonText}
        onPress={handleSubmit}
        solid
        style={styles.button}
        title="Submit"
      />
    </ScrollView>
  );
};

export default AddVenue;

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.medium,
    borderRadius: 4,
    height: 28,
    justifyContent: 'center',
    marginLeft: 12,
    marginTop: 20,
    width: 28,
  },
  addKeyword: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 12,
    paddingLeft: 10,
    width: '80%',
  },
  button: {
    alignSelf: 'center',
    height: 29,
    marginVertical: 10,
    width: 155,
  },
  buttonText: {
    fontFamily: fonts[700],
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  imagesList: {
    width: '80%',
    alignSelf: 'center',
  },
  logoContainer: {
    alignSelf: 'center',
    padding: 10,
    width: '80%',
  },
  map: {
    alignSelf: 'center',
    marginTop: 8,
    width: '80%',
  },
  mapText: {
    fontSize: 12,
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  normalText: {
    alignSelf: 'center',
    padding: 10,
    width: '80%',
  },
  uploadBanner: {
    alignSelf: 'center',
    marginTop: 20,
  },
});
