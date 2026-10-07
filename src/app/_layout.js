import React from 'react';
import { Stack } from 'expo-router';

import { TripProvider } from '../context/TripContext';
import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <TripProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </TripProvider>
    </ThemeProvider>
  );
}