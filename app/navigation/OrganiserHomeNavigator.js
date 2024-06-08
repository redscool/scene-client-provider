import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeOrganiser from '../screens/HomeOrganiser';
import Icon from '../Icons';
import Profile from '../screens/Profile';
import routes from './routes';

const Tab = createBottomTabNavigator();

const OrganiserHomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.text,
        tabBarShowLabel: false,
        tabBarStyle: {height: 60},
      }}>
      <Tab.Screen
        component={HomeOrganiser}
        name={routes.HOME}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={Profile}
        name={routes.PROFILE}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default OrganiserHomeNavigator;
