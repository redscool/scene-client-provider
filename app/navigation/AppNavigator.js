import React from 'react';
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

import EditVenue from '../screens/EditVenue';
import EditEvent from '../screens/EditEvent';
import Event from '../screens/Event';
import LandingPage from '../screens/LandingPage';

const Stack = createNativeStackNavigator();

export default AppNavigator = () => {
  return (
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
  );
};
