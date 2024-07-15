import React from 'react';

import AppNavigator from './AppNavigator';
import {AppConfigProvider} from '../../context/appConfig';
import {AuthProvider} from '../../context/auth';
import {EventsProvider} from '../../context/event';

function ContextProvidersWrapper() {
  return (
    <AppConfigProvider>
      <AuthProvider>
        <EventsProvider>
          <AppNavigator />
        </EventsProvider>
      </AuthProvider>
    </AppConfigProvider>
  );
}

export default ContextProvidersWrapper;
