import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import navigationTheme from './app/navigation/navigationTheme';
import NavigationWrapper from './app/navigation/NavigationWrapper';

function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <NavigationWrapper />
    </NavigationContainer>
  );
}

export default App;
