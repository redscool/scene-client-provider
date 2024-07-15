import {createContext, useContext, useState} from 'react';
import useService from './service';

const setMap = (data, setData) => {
  let temp = {};
  const array = [...data];
  array.forEach(x => (temp[x['code']] = x));
  setData(temp);
};

export const AppConfigContext = createContext();

export default function useAppConfig() {
  return useContext(AppConfigContext);
}

export const AppConfigProvider = ({children}) => {
  const {request} = useService();

  const [venueTags, setVenueTags] = useState({});

  const [eventTags, setEventTags] = useState({});
  const [timeTags, setTimeTags] = useState({});
  const [specialEventTags, setSpecialEventTags] = useState({});
  const [allEventTags, setAllEventTags] = useState({});

  const [cities, setCities] = useState({});

  const [types, setTypes] = useState({});

  const getVenueTags = async () => {
    const tVenueTags = await request('get', '/api/app/venueTags', {});
    setMap(tVenueTags, setVenueTags);
  };

  const getEventTags = async () => {
    const tEventTags = await request('get', '/api/app/eventTags', {});
    setMap(tEventTags, setEventTags);

    const tTimeTags = await request('get', '/api/app/timeTags', {});
    setMap(tTimeTags, setTimeTags);

    const tSpecialEventTags = await request(
      'get',
      '/api/app/specialeventTags',
      {},
    );
    setMap(tSpecialEventTags, setSpecialEventTags);

    setAllEventTags({...eventTags, ...timeTags, ...specialEventTags});
  };

  const getCities = async () => {
    const tCities = await request('get', '/api/app/cities', {});
    setMap(tCities, setCities);
  };

  const getTypes = async () => {
    const tTypes = await request('get', '/api/app/types', {});
    setMap(tTypes, setTypes);
  };
  return (
    <AppConfigContext.Provider
      value={{
        cities,
        eventTags,
        allEventTags,
        specialEventTags,
        timeTags,
        types,
        venueTags,
        getVenueTags,
        getEventTags,
        getCities,
        getTypes,
      }}>
      {children}
    </AppConfigContext.Provider>
  );
};
