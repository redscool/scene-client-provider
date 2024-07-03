import {createContext, useContext, useState} from 'react';
import useService from './service';
import useAuth from './auth';

export const EventsContext = createContext();

export default function useEvents() {
  return useContext(EventsContext);
}

export const EventsProvider = ({children}) => {
  const {requestWithAccessToken} = useService();
  const {userId} = useAuth();

  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const creatorId = userId;
    if (creatorId) {
      const res = await requestWithAccessToken('get', '/api/app/event/events', {
        creatorId,
      });
      setEvents(res);
    }
  };
  return (
    <EventsContext.Provider value={{events, setEvents, getEvents}}>
      {children}
    </EventsContext.Provider>
  );
};
