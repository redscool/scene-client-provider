import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import fonts from '../config/fonts';
import ForgotPassword from '../screens/ForgotPassword';
import Login from '../screens/Login';
import LoginHome from '../screens/LoginHome';
import OtpResetPassword from '../screens/OtpResetPassword';
import routes from './routes';
import ResetPassword from '../screens/ResetPassword';
import AddVenue from '../screens/AddVenue';
import StaffLogin from '../screens/StaffLogin';
import HomeStaff from '../screens/HomeStaff';
import ScanTicket from '../screens/ScanTicket';
import ValidTicket from '../screens/ValidTicket';
import OrganiserHomeNavigator from './OrganiserHomeNavigator';
import AddEvent from '../screens/AddEvent';
import EventOptions from '../screens/EventOptions';
import InviteStaff from '../screens/InviteStaff';
import useService from '../../context/ServiceContext';
import {ConfigContext} from '../../context/ConfigContext';

import EditVenue from '../screens/EditVenue';
import EditEvent from '../screens/EditEvent';
import Event from '../screens/Event';
import LandingPage from '../screens/LandingPage';

const Stack = createNativeStackNavigator();

const getConfigObject = (
  venueTags,
  eventTags,
  timeTags,
  specialEventTags,
  cities,
  types,
) => {
  return {
    venueTags,
    eventTags,
    timeTags,
    specialEventTags,
    cities,
    getAllEventTags: () => {
      return {...eventTags, ...timeTags, ...specialEventTags};
    },
    types,
  };
};

export default AppNavigator = () => {
  const {request} = useService();

  const [venueTags, setVenueTags] = useState({});
  const [eventTags, setEventTags] = useState({});
  const [timeTags, setTimeTags] = useState({});
  const [specialEventTags, setSpecialEventTags] = useState({});

  const [cities, setCities] = useState({});
  const [types, setTypes] = useState({});

  const setMap = (data, setData) => {
    let temp = {};
    const array = [...data];
    array.forEach(x => (temp[x['code']] = x));
    setData(temp);
  };

  const init = async () => {
    const tVenueTags = await request('get', '/api/app/venueTags', {});
    setMap(tVenueTags, setVenueTags);

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

    const tCities = await request('get', '/api/app/cities', {});
    setMap(tCities, setCities);

    const tTypes = await request('get', '/api/app/types', {});
    setMap(tTypes, setTypes);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <ConfigContext.Provider
      value={getConfigObject(
        venueTags,
        eventTags,
        timeTags,
        specialEventTags,
        cities,
        types,
      )}>
      <Stack.Navigator screenOptions={{animation: 'fade_from_bottom'}}>
        <Stack.Screen
          component={LandingPage}
          name={routes.LANDING_PAGE}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={LoginHome}
          name={routes.LOGIN}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Login}
          name={routes.LOGIN_ORGANISER}
          options={{
            headerTitle: 'Login',
            headerTitleStyle: {
              fontFamily: fonts[600],
            },
          }}
        />
        <Stack.Screen
          component={StaffLogin}
          name={routes.LOGIN_STAFF}
          options={{
            title: 'Scan QR',
            headerTitleStyle: {
              fontFamily: fonts[600],
            },
          }}
        />
        <Stack.Screen
          component={ForgotPassword}
          name={routes.FORGOT_PASSWORD}
          options={{
            headerTitleStyle: {
              fontFamily: fonts[600],
            },
          }}
        />
        <Stack.Screen
          component={OtpResetPassword}
          name={routes.CONFIRM_EMAIL}
          options={{
            headerTitleStyle: {
              fontFamily: fonts[600],
            },
          }}
        />
        <Stack.Screen
          component={ResetPassword}
          name={routes.RESET_PASSWORD}
          options={{
            headerTitleStyle: {
              fontFamily: fonts[600],
            },
          }}
        />
        <Stack.Screen
          component={HomeStaff}
          name={routes.HOME_STAFF}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={ScanTicket}
          name={routes.SCAN_TICKET}
          options={{
            title: 'Scan QR',
            headerTitleStyle: {
              fontFamily: fonts[600],
            },
          }}
        />
        <Stack.Screen
          component={ValidTicket}
          name={routes.VALID_TICKET}
          options={{
            headerTitleStyle: {
              fontFamily: fonts[600],
            },
          }}
        />
        <Stack.Screen
          component={OrganiserHomeNavigator}
          name={routes.HOME_ORGANISER}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={AddEvent}
          name={routes.ADD_EVENT}
          options={{
            headerTitleStyle: {
              fontFamily: fonts[600],
            },
          }}
        />
        <Stack.Screen
          component={EditEvent}
          name={routes.EDIT_EVENT}
          options={{
            headerTitleStyle: {
              fontFamily: fonts[600],
            },
          }}
        />
        <Stack.Screen
          component={EditVenue}
          name={routes.EDIT_VENUE}
          options={{
            headerTitleStyle: {
              fontFamily: fonts[600],
            },
          }}
        />
        <Stack.Screen
          component={EventOptions}
          name={routes.EVENT_OPTIONS}
          options={({route}) => ({
            headerTitleStyle: {
              fontFamily: fonts[600],
            },
            title: route.params.name,
          })}
        />
        <Stack.Screen
          component={InviteStaff}
          name={routes.INVITE_STAFF}
          options={{
            headerTitleStyle: {
              fontFamily: fonts[600],
            },
          }}
        />
        <Stack.Screen
          component={AddVenue}
          name={routes.ADD_VENUE}
          options={{
            headerTitleStyle: {
              fontFamily: fonts[600],
            },
          }}
        />
        <Stack.Screen
          component={Event}
          name={routes.PREVIEW_EVENT}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </ConfigContext.Provider>
  );
};
