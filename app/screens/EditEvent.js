import {FlatList, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import AppButton from '../components/AppButton';
import DateTimeInput from '../components/DateTimeInput';
import Dropdown from '../components/DropDown';
import fonts from '../config/fonts';
import Input from '../components/Input';
import NormalText from '../components/NormalText';
import Subheading from '../components/Subheading';
import UploadBanner from '../components/UploadBanner';
import UploadedImageCard from '../components/UploadedImageCard';
import UploadImage from '../components/UploadImage';
import UploadImageCard from '../components/UploadImageCard';
import {showToast} from '../components/widgets/toast';
import Icon from '../Icons';
import KeywordListItem from '../components/KeywordListItem';
import {useConfig, useService} from '../../context';
import routes from '../navigation/routes';

const EditEvent = ({navigation, route}) => {
  const event = route.params;

  const {requestWithAccessToken} = useService();
  const {cities, eventTags} = useConfig();

  const [bannerImage, setBannerImage] = useState();
  const [name, setName] = useState('');
  const [sDate, setSDate] = useState(new Date());
  const [sTime, setSTime] = useState(new Date());
  const [eDate, setEDate] = useState(new Date());
  const [eTime, setETime] = useState(new Date());
  const [about, setAbout] = useState();
  const [note, setNote] = useState();
  const [filtersArray, setFilterArray] = useState(
    new Array(Object.values(eventTags).length).fill(false),
  );
  const [keywords, setKeywords] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [logo, setLogo] = useState();

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

  const setImagesArrayHandler = array => {
    const temp = [...gallery, ...array];
    setGallery(temp);
  };

  const deleteImage = deleteIndex => {
    gallery.splice(deleteIndex, 1);
    setGallery([...gallery]);
  };

  const filterClickHandler = index => {
    const temp = [...filtersArray];
    temp[index] = !temp[index];
    setFilterArray(temp);
  };

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [open, setOpen] = useState(false);
  const [uploadType, setUploadType] = useState();
  const [galleryTilesArray, setGalleryTilesArray] = useState();
  const [keywordInput, setKeywordInput] = useState('');

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

  const init = async () => {
    const res = await requestWithAccessToken('get', '/api/app/event', {
      eventId: event._id,
    });
    setBannerImage(res.bannerImage);
    setName(res.name);
    setSDate(new Date(res.startTime));
    setSTime(new Date(res.startTime));
    setEDate(new Date(res.endTime));
    setETime(new Date(res.endTime));
    setAbout(res.about);
    setNote(res.note);
    const tTags = Object.values(eventTags);
    const temp = new Array(tTags.length).fill(false);
    for (let tag of res.tags)
      for (let i = 0; i < tTags.length; i++)
        if (tag === tTags[i].code) temp[i] = true;
    setFilterArray(temp);
    setKeywords(res.keywords);
    setGallery(res.gallery);
    setLogo(res.logo);
  };

  useEffect(() => {
    const tempTime = new Date(sDate);
    tempTime.setHours(sTime.getHours());
    tempTime.setMinutes(sTime.getMinutes());
    setStartTime(tempTime.getTime());
  }, [sDate, sTime]);

  useEffect(() => {
    const tempTime = new Date(eDate);
    tempTime.setHours(eTime.getHours());
    tempTime.setMinutes(eTime.getMinutes());
    setEndTime(tempTime.getTime());
  }, [eDate, eTime]);

  useEffect(() => {
    const temp = [{id: 1}, ...gallery];
    if (temp.length % 3 === 2) temp.push({id: temp.length, type: 'space'});
    setGalleryTilesArray(temp);
  }, [gallery]);

  useEffect(() => {
    init();
  }, []);

  const handleSubmit = async () => {
    if (
      !name ||
      !startTime ||
      !endTime ||
      !about ||
      !note ||
      !logo ||
      !bannerImage ||
      !gallery
    ) {
      showToast('Please Enter All the Details.');
      return;
    }
    const tags = [];
    for (let i = 0; i < filtersArray.length; i++)
      if (filtersArray[i]) tags.push(Object.values(eventTags)[i].code);
    const data = {
      name,
      startTime,
      endTime,
      about,
      note,
      logo,
      bannerImage,
      gallery,
      tags,
      keywords,
    };
    // TODO: error handling
    try {
      const resp = await requestWithAccessToken('patch', '/api/app/event', {
        eventId: event._id,
        eventData: data,
      });
      showToast('Event updated successfully.');
      navigation.reset({
        index: 0,
        routes: [{name: routes.HOME_ORGANISER}],
      });
    } catch (e) {
      showToast('Something went wrong.');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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
      <DateTimeInput
        label="Start Date"
        mode="date"
        setState={setSDate}
        state={sDate}
        style={{marginTop: 16}}
      />
      <DateTimeInput
        label="Start Time"
        mode="time"
        setState={setSTime}
        state={sTime}
        style={{marginTop: 16}}
      />
      <DateTimeInput
        label="End Date"
        mode="date"
        setState={setEDate}
        state={eDate}
        style={{marginTop: 16}}
      />
      <DateTimeInput
        label="End Time"
        mode="time"
        setState={setETime}
        state={eTime}
        style={{marginTop: 16}}
      />

      <Input
        label="About"
        placeholder="Placeholder"
        setState={setAbout}
        state={about}
        style={{marginTop: 16}}
      />
      <Input
        label="Note / Special Instructions"
        placeholder="Placeholder"
        setState={setNote}
        state={note}
        style={{marginTop: 16}}
      />
      <Subheading subheading="Add Tags" />
      <FlatList
        data={Object.values(eventTags)}
        keyExtractor={item => item}
        numColumns={3}
        renderItem={({item, index}) => (
          <AppButton
            fontStyle={{
              fontSize: 10,
              fontFamily: filtersArray[index] ? fonts[600] : fonts[300],
            }}
            onPress={() => filterClickHandler(index)}
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
      <AppButton
        fontStyle={styles.buttonText}
        onPress={handleSubmit}
        solid
        style={styles.button}
        title="Submit"
      />
    </ScrollView>
  );
};

export default EditEvent;

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
