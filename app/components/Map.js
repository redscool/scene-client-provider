import {StyleSheet, TextInput, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import colors from '../config/colors';
import Icon from '../Icons';
import fonts from '../config/fonts';
import AppButton from './AppButton';
import {useState} from 'react';
import {useService} from '../../context';
import {showToast} from './widgets/toast';

export default ({setAddress, setSelected, setVisible}) => {
  const {requestWithAccessToken} = useService();
  const [searchInput, setSearchInput] = useState('');
  const [iniLat, setIniLat] = useState(22.258);
  const [iniLng, setIniLng] = useState(71.19);
  const [iniZoom, setIniZoom] = useState(100);
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async () => {
    let query = searchInput.trim();
    if (!query) return;

    try {
      const temp = [];
      const {places} = await requestWithAccessToken(
        'get',
        '/api/app/venue/place',
        {
          query,
        },
      );
      for (let element of places) {
        temp.push({
          ...element.geometry.location,
          name: element.name,
          address: element.formatted_address,
        });
      }
      setIniLat(temp[0].lat);
      setIniLng(temp[0].lng);
      setIniZoom(0.1);
      setSearchResults(temp);
    } catch (e) {
      // TODO: error handling
      showToast('Something went wrong.');
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        zoomEnabled={true}
        region={{
          latitude: iniLat,
          longitude: iniLng,
          latitudeDelta: iniZoom,
          longitudeDelta: iniZoom,
        }}>
        {searchResults.map((result, index) => (
          <Marker
            key={`marker-%${index}`}
            coordinate={{latitude: result.lat, longitude: result.lng}}
            title={result.name}
            description={result.address}
            onPress={() => {
              setAddress(result.address);
              setSelected({lat: result.lat, lng: result.lng});
              setVisible(false);
            }}
          />
        ))}
      </MapView>
      <View style={styles.searchBox}>
        <View style={styles.searchInput}>
          <Icon
            color={colors.placeholder}
            name="search"
            size={16}
            style={{marginLeft: 8}}
          />
          <TextInput
            keyboardType="web-search"
            onChangeText={setSearchInput}
            placeholder="Search"
            placeholderTextColor={colors.placeholder}
            style={styles.input}
            value={searchInput}
          />
        </View>
        <AppButton
          fontStyle={styles.buttonText}
          onPress={handleSearch}
          solid
          style={styles.button}
          title="Search"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '85%',
    height: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 12,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBox: {
    height: 100,
    width: '80%',
    backgroundColor: colors.medium,
    position: 'absolute',
    top: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  searchInput: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 4,
    flexDirection: 'row',
    height: 30,
    width: '85%',
  },
  input: {
    color: colors.placeholder,
    fontSize: 14,
    fontFamily: fonts[500],
    height: 30,
    marginLeft: 8,
    padding: 0,
    width: '80%',
  },
});
