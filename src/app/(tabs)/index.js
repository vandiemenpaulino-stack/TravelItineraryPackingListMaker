import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { router } from 'expo-router';
import { useTrip } from '../../context/TripContext';

export default function Home() {
  const { trip } = useTrip();

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Traveler! 👋</Text>
        <Text style={styles.title}>Ready for your next adventure?</Text>
      </View>

      <TouchableOpacity
        style={styles.tripCard}
        onPress={() => router.push('/(tabs)/trips')}
      >
        <Text style={styles.cardLabel}>NEXT TRIP</Text>

        <Text style={styles.destination}>
          🏝️ {trip.destination || 'Your next adventure'}
        </Text>

        <Text style={styles.date}>
          {trip.destination
            ? `${trip.startDate.toLocaleDateString()} - ${trip.endDate.toLocaleDateString()}`
            : 'Plan your destination in My Trips'}
      </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.actions}>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/(tabs)/trips')}
        >
          <Text style={styles.actionIcon}>🧳</Text>
          <Text style={styles.actionText}>My Trips</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/(tabs)/explore')}
        >
          <Text style={styles.actionIcon}>🗺️</Text>
          <Text style={styles.actionText}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/(tabs)/budget')}
        >
          <Text style={styles.actionIcon}>💰</Text>
          <Text style={styles.actionText}>Budget</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/(tabs)/trips')}
        >
          <Text style={styles.actionIcon}>🎒</Text>
          <Text style={styles.actionText}>Packing</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>🌴 Travel Tip</Text>

        <Text style={styles.tipText}>
          Pack only what you need and always keep important documents safe.
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E8',
  },

  header: {
    backgroundColor: '#159A68',
    paddingTop: 60,
    paddingHorizontal: 22,
    paddingBottom: 28,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  greeting: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 8,
  },

  tripCard: {
    backgroundColor: '#20C7C7',
    margin: 20,
    padding: 22,
    borderRadius: 22,
  },

  cardLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  destination: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },

  date: {
    color: '#FFFFFF',
    marginTop: 6,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#173B35',
    marginHorizontal: 20,
    marginBottom: 12,
  },

  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },

  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 18,
    marginBottom: 12,
    alignItems: 'center',
  },

  actionIcon: {
    fontSize: 30,
  },

  actionText: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#173B35',
  },

  tipCard: {
    backgroundColor: '#FFD447',
    margin: 20,
    marginTop: 8,
    padding: 20,
    borderRadius: 20,
  },

  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#173B35',
  },

  tipText: {
    color: '#173B35',
    marginTop: 6,
    lineHeight: 21,
  },
});