import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const TripContext = createContext();

const STORAGE_KEY = '@travel_trip';

export function TripProvider({ children }) {
  const [trip, setTrip] = useState({
    destination: '',
    startDate: new Date(),
    endDate: new Date(),
    transport: '',
    itinerary: [],
    packingList: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrip();
  }, []);

  useEffect(() => {
    if (!loading) {
      saveTrip();
    }
  }, [trip, loading]);

  const loadTrip = async () => {
    try {
      const savedTrip = await AsyncStorage.getItem(STORAGE_KEY);

      if (savedTrip) {
        const parsedTrip = JSON.parse(savedTrip);

        setTrip({
          ...parsedTrip,
          startDate: new Date(parsedTrip.startDate),
          endDate: new Date(parsedTrip.endDate),
        });
      }
    } catch (error) {
      console.log('Error loading trip:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTrip = async () => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(trip)
      );
    } catch (error) {
      console.log('Error saving trip:', error);
    }
  };

  const clearTrip = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);

      setTrip({
        destination: '',
        startDate: new Date(),
        endDate: new Date(),
        transport: '',
        itinerary: [],
      });
    } catch (error) {
      console.log('Error clearing trip:', error);
    }
};

  return (
    <TripContext.Provider value={{ trip, setTrip, clearTrip }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  return useContext(TripContext);
}