import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

import { useTrip } from '../../context/TripContext';

export default function Trips() {
  const { trip, setTrip } = useTrip();

  const [destination, setDestination] = useState(trip.destination || '');
  const [startDate, setStartDate] = useState(
    trip.startDate ? new Date(trip.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState(
    trip.endDate ? new Date(trip.endDate) : new Date()
  );
  const [transport, setTransport] = useState(trip.transport || '');

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // ITINERARY
  const [activity, setActivity] = useState('');
  const [activityTime, setActivityTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [itinerary, setItinerary] = useState(
    trip.itinerary || []
  );

  // PACKING LIST
  const [packingItem, setPackingItem] = useState('');

  const [packingList, setPackingList] = useState(
    trip.packingList || [
      {
        id: '1',
        name: 'Clothes',
        checked: false,
      },
      {
        id: '2',
        name: 'Toiletries',
        checked: false,
      },
      {
        id: '3',
        name: 'Phone Charger',
        checked: false,
      },
      {
        id: '4',
        name: 'Important Documents',
        checked: false,
      },
      {
        id: '5',
        name: 'Medicine',
        checked: false,
      },
    ]
  );

  // ADD ACTIVITY
  const addActivity = () => {
    if (!activity.trim()) {
      Alert.alert('Missing Activity', 'Please enter an activity.');
      return;
    }

    const newActivity = {
      id: Date.now().toString(),
      name: activity.trim(),
      time: activityTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setItinerary([...itinerary, newActivity]);
    setActivity('');
  };

  // REMOVE ACTIVITY
  const removeActivity = (id) => {
    setItinerary(
      itinerary.filter((item) => item.id !== id)
    );
  };

  // ADD PACKING ITEM
  const addPackingItem = () => {
    if (!packingItem.trim()) {
      Alert.alert('Missing Item', 'Please enter something to bring.');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: packingItem.trim(),
      checked: false,
    };

    setPackingList([...packingList, newItem]);
    setPackingItem('');
  };

  // CHECK / UNCHECK PACKING ITEM
  const togglePackingItem = (id) => {
    setPackingList(
      packingList.map((item) =>
        item.id === id
          ? {
              ...item,
              checked: !item.checked,
            }
          : item
      )
    );
  };

  // REMOVE PACKING ITEM
  const removePackingItem = (id) => {
    setPackingList(
      packingList.filter((item) => item.id !== id)
    );
  };

  // SAVE EVERYTHING
  const saveTrip = () => {
    setTrip({
      destination,
      startDate,
      endDate,
      transport,
      itinerary,
      packingList,
    });

    Alert.alert(
      'Trip Saved',
      'Your trip, itinerary, and packing list have been saved! 🧳'
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      {/* TITLE */}
      <Text style={styles.pageTitle}>Plan Your Trip</Text>

      {/* DESTINATION */}
      <Text style={styles.label}>Destination</Text>

      <TextInput
        style={styles.input}
        placeholder="Where are you going?"
        placeholderTextColor="#8A9A94"
        value={destination}
        onChangeText={setDestination}
      />

      {/* DATES */}
      <Text style={styles.label}>Travel Dates</Text>

      <View style={styles.dateRow}>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowStartPicker(true)}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#159A68"
          />

          <Text style={styles.dateButtonText}>
            {startDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        <Text style={styles.dateArrow}>→</Text>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowEndPicker(true)}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#159A68"
          />

          <Text style={styles.dateButtonText}>
            {endDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

      </View>

      {/* START DATE PICKER */}
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display={
            Platform.OS === 'ios'
              ? 'spinner'
              : 'default'
          }
          onValueChange={(event, date) => {
            if (date) {
              setStartDate(date);
            }
          }}
          onDismiss={() => setShowStartPicker(false)}
        />
      )}

      {/* END DATE PICKER */}
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display={
            Platform.OS === 'ios'
              ? 'spinner'
              : 'default'
          }
          onValueChange={(event, date) => {
            if (date) {
              setEndDate(date);
            }
          }}
          onDismiss={() => setShowEndPicker(false)}
        />
      )}

      {/* TRANSPORTATION */}
      <Text style={styles.label}>Transportation</Text>

      <View style={styles.transportRow}>

        {[
          { name: 'Car', icon: 'car-outline' },
          { name: 'Bus', icon: 'bus-outline' },
          { name: 'Ferry', icon: 'boat-outline' },
          { name: 'Airplane', icon: 'airplane-outline' },
        ].map((item) => (
          <TouchableOpacity
            key={item.name}
            style={[
              styles.transportButton,
              transport === item.name &&
                styles.transportButtonActive,
            ]}
            onPress={() => setTransport(item.name)}
          >
            <Ionicons
              name={item.icon}
              size={23}
              color={
                transport === item.name
                  ? '#FFFFFF'
                  : '#159A68'
              }
            />

            <Text
              style={[
                styles.transportText,
                transport === item.name &&
                  styles.transportTextActive,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}

      </View>

      {/* ITINERARY */}
      <Text style={styles.sectionTitle}>Itinerary</Text>

      <View style={styles.activityInputRow}>

        <TextInput
          style={styles.activityInput}
          placeholder="Add activity"
          placeholderTextColor="#8A9A94"
          value={activity}
          onChangeText={setActivity}
        />

        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setShowTimePicker(true)}
        >
          <Ionicons
            name="time-outline"
            size={22}
            color="#159A68"
          />

          <Text style={styles.timeText}>
            {activityTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={addActivity}
        >
          <Ionicons
            name="add"
            size={28}
            color="#FFFFFF"
          />
        </TouchableOpacity>

      </View>

      {/* ACTIVITY TIME PICKER */}
      {showTimePicker && (
        <DateTimePicker
          value={activityTime}
          mode="time"
          display={
            Platform.OS === 'ios'
              ? 'spinner'
              : 'default'
          }
          onValueChange={(event, date) => {
            if (date) {
              setActivityTime(date);
            }
          }}
          onDismiss={() => setShowTimePicker(false)}
        />
      )}

      {/* ITINERARY PREVIEW */}
      <View style={styles.previewCard}>

        {itinerary.length === 0 ? (
          <Text style={styles.emptyText}>
            No activities added yet.
          </Text>
        ) : (
          itinerary.map((item, index) => (
            <View
              key={item.id}
              style={styles.activityItem}
            >

              <View style={styles.activityNumber}>
                <Text style={styles.activityNumberText}>
                  {index + 1}
                </Text>
              </View>

              <View style={styles.activityInfo}>
                <Text style={styles.activityName}>
                  {item.name}
                </Text>

                <Text style={styles.activityTime}>
                  🕐 {item.time}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => removeActivity(item.id)}
              >
                <Ionicons
                  name="trash-outline"
                  size={21}
                  color="#FF6B61"
                />
              </TouchableOpacity>

            </View>
          ))
        )}

      </View>

      {/* PACKING LIST */}
      <Text style={styles.sectionTitle}>
        Packing List
      </Text>

      <View style={styles.activityInputRow}>

        <TextInput
          style={styles.activityInput}
          placeholder="What do you need to bring?"
          placeholderTextColor="#8A9A94"
          value={packingItem}
          onChangeText={setPackingItem}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addPackingItem}
        >
          <Ionicons
            name="add"
            size={28}
            color="#FFFFFF"
          />
        </TouchableOpacity>

      </View>

      {/* PACKING LIST PREVIEW */}
      <View style={styles.packingCard}>

        {packingList.length === 0 ? (
          <Text style={styles.emptyText}>
            Your packing list is empty.
          </Text>
        ) : (
          packingList.map((item) => (
            <View
              key={item.id}
              style={styles.packingItem}
            >

              <TouchableOpacity
                style={styles.packingLeft}
                onPress={() =>
                  togglePackingItem(item.id)
                }
              >

                <View
                  style={[
                    styles.checkbox,
                    item.checked &&
                      styles.checkboxChecked,
                  ]}
                >
                  {item.checked && (
                    <Ionicons
                      name="checkmark"
                      size={17}
                      color="#FFFFFF"
                    />
                  )}
                </View>

                <Text
                  style={[
                    styles.packingText,
                    item.checked &&
                      styles.packingTextChecked,
                  ]}
                >
                  {item.name}
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  removePackingItem(item.id)
                }
              >
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color="#FF6B61"
                />
              </TouchableOpacity>

            </View>
          ))
        )}

      </View>

      {/* SAVE */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveTrip}
      >
        <Ionicons
          name="save-outline"
          size={21}
          color="#FFFFFF"
        />

        <Text style={styles.saveButtonText}>
          Save Trip
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E8',
  },

  content: {
    paddingTop: 55,
    paddingBottom: 30,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#123B35',
    marginHorizontal: 20,
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#123B35',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    color: '#123B35',
    borderWidth: 1,
    borderColor: '#D9E5DF',
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },

  dateButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderWidth: 1,
    borderColor: '#D9E5DF',
  },

  dateButtonText: {
    color: '#123B35',
    fontSize: 14,
  },

  dateArrow: {
    marginHorizontal: 8,
    fontSize: 18,
    color: '#159A68',
  },

  transportRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginHorizontal: 20,
  },

  transportButton: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9E5DF',
  },

  transportButtonActive: {
    backgroundColor: '#159A68',
    borderColor: '#159A68',
  },

  transportText: {
    marginTop: 5,
    color: '#123B35',
    fontWeight: '600',
  },

  transportTextActive: {
    color: '#FFFFFF',
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#123B35',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 12,
  },

  activityInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    gap: 8,
  },

  activityInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    color: '#123B35',
    borderWidth: 1,
    borderColor: '#D9E5DF',
  },

  timeButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: '#D9E5DF',
  },

  timeText: {
    color: '#123B35',
    fontSize: 13,
    fontWeight: '600',
  },

  addButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#FF6B61',
    alignItems: 'center',
    justifyContent: 'center',
  },

  previewCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 18,
    padding: 15,
  },

  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2EF',
  },

  activityNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#DDF5EA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  activityNumberText: {
    color: '#159A68',
    fontWeight: 'bold',
  },

  activityInfo: {
    flex: 1,
    marginLeft: 12,
  },

  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#123B35',
  },

  activityTime: {
    fontSize: 13,
    color: '#71837C',
    marginTop: 3,
  },

  emptyText: {
    textAlign: 'center',
    color: '#8A9A94',
    paddingVertical: 15,
  },

  packingCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 18,
    paddingHorizontal: 15,
  },

  packingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2EF',
  },

  packingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#159A68',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  checkboxChecked: {
    backgroundColor: '#159A68',
  },

  packingText: {
    fontSize: 16,
    color: '#123B35',
  },

  packingTextChecked: {
    textDecorationLine: 'line-through',
    color: '#8A9A94',
  },

  saveButton: {
    backgroundColor: '#159A68',
    marginHorizontal: 20,
    marginTop: 25,
    padding: 17,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});