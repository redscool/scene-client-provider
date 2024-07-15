import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import navigationTheme from './app/navigation/navigationTheme';
import ServiceContextProviderWrapper from './app/navigation/ServiceContextProviderWrapper';
import {SafeAreaView, StatusBar, View} from 'react-native';

function App() {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <View style={{backgroundColor: colors.dark, flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer theme={navigationTheme}>
            <ServiceContextProviderWrapper />
          </NavigationContainer>
        </SafeAreaView>
      </View>
    </>
  );
}

export default App;
