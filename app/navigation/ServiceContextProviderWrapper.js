import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {ServiceContext} from '../../context/service';

import {
  request,
  requestFileServer,
  requestWithAccessToken,
} from '../api/client';

import ContextProvidersWrapper from './ContextProvidersWrapper';

const getServiceObject = navigation => {
  return {
    request: request(navigation),
    requestWithAccessToken: requestWithAccessToken(navigation),
    requestFileServer: requestFileServer(navigation),
  };
};

function ServiceContextProviderWrapper() {
  const navigation = useNavigation();
  return (
    <ServiceContext.Provider value={getServiceObject(navigation)}>
      <ContextProvidersWrapper />
    </ServiceContext.Provider>
  );
}

export default ServiceContextProviderWrapper;
