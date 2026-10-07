import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

const destinations = [
  {
    name: 'Kawasan Falls',
    location: 'Badian, Cebu',
    description: 'A famous three-tier cascading waterfall system with crystal-clear turquoise waters located in the lush jungles of Barangay Matutinao in Badian, Cebu',
    category: 'Nature',
    image: require('../../../assets/images/destinations/Kawasan-Falls.jpeg'),
  },
  {
    name: 'Bantayan Island',
    location: 'Cebu City, Philippines',
    description: 'A tropical paradise in the Visayan Sea, sitting west of northern Cebu, Philippines',
    category: 'Beaches',
    image: require('../../../assets/images/destinations/BantayanIsland.jpeg'),
  },
  {
    name: 'Basilica Minore del Santo Niño de Cebu',
    location: 'Cebu City, Philippines',
    description: 'Is the oldest Roman Catholic church in the Philippines, founded in the 16th century by Spanish explorers',
    category: 'City',
    image: require('../../../assets/images/destinations/BasilicaMinoreDelSantoNinoDeCebu.jpeg'),
  },
  {
    name: 'Magellan Cross',
    location: 'Plaza Sugbo, Cebu City',
    description: 'A famous Christian cross housed in an octagonal stone kiosk in Cebu City, Philippines',
    category: 'City',
    image: require('../../../assets/images/destinations/MagellanCross.jpeg'),
  },
  {
    name: 'Osmeña Peak',
    location: 'Dalaguete, Southern Cebu',
    description: 'It is the highest peak in Cebu, Philippines, and is known for its stunning panoramic views of the surrounding mountains and coastline.',
    category: 'Nature',
    image: require('../../../assets/images/destinations/OsmenaPeak.jpeg'),
  },
  {
    name: 'Bukilat Cave',
    location: 'Poro Island, Camotes Islands, Cebu',
    description: 'It is considered the largest and most famous natural underground cave in Poro Island within the Camotes Islands group in Cebu, Philippines.',
    category: 'Nature',
    image: require('../../../assets/images/destinations/BukilatCave.jpg'),
  },
  {
    name: 'Casa Gorordo Museum',
    location: 'Cebu City, Philippines',
    description: 'It is a well preserved 19th-century balay nga tisa heritage house in Cebu City historic Parian district.',
    category: 'City',
    image: require('../../../assets/images/destinations/CasaGorordoMuseum.jpeg'),
  },
  {
    name: 'House of Lechon',
    location: 'Acacia St, Cebu City',
    description: 'a famous Michelin-listed restaurant in Cebu City, Philippines, known for serving traditional Carcar-style roasted pork with ultra-crispy skin, rich aromatic stuffing, and unique self-saucing drippings.',
    category: 'Foods',
    image: require('../../../assets/images/destinations/HouseOfLechon.jpg'),
  },
  {
    name: 'Sugbo Mercado',
    location: 'Skyrise 5, J.M. del Mar Ave., Cebu IT Park, Cebu City',
    description: 'Sugbo Mercado in Cebu IT Park is Cebus first and biggest year-round night food market. .',
    category: 'Foods',
    image: require('../../../assets/images/destinations/SugboMercado.jpg'),
  }
];

const categories = ['All', 'Nature', 'Beaches', 'City', 'Foods'];

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredDestinations = destinations.filter((destination) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      destination.category === selectedCategory;

    const matchesSearch =
      destination.name.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>

        <Text style={styles.subtitle}>
          Discover your next destination
        </Text>

        <TextInput
          style={styles.search}
          placeholder="Search destinations..."
          placeholderTextColor="#7B8B84"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category &&
                  styles.categoryButtonSelected,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category &&
                    styles.categoryTextSelected,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.sectionTitle}>
        Popular Destinations
      </Text>

      <View style={styles.destinationContainer}>
        {filteredDestinations.map((destination) => (
          <TouchableOpacity
            key={destination.name}
            style={styles.destinationCard}
          >
            {destination.image ? (
              <Image
                source={destination.image}
                style={styles.destinationImage}
              />
            ) : (
              <View style={styles.destinationImagePlaceholder}>
                <Text style={styles.destinationEmoji}>
                  {destination.emoji}
                </Text>
              </View>
            )}

            <View style={styles.destinationInfo}>
              <Text style={styles.destinationName}>
                {destination.name}
              </Text>

              <Text style={styles.location}>
                📍 {destination.location}
              </Text>

              <Text style={styles.description}>
                {destination.description}
              </Text>

              <View style={styles.tag}>
                <Text style={styles.tagText}>
                  {destination.category}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {filteredDestinations.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🔎</Text>

          <Text style={styles.emptyTitle}>
            No destination found
          </Text>

          <Text style={styles.emptyText}>
            Try another destination or category.
          </Text>
        </View>
      )}

      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>
          Travel Idea
        </Text>

        <Text style={styles.tipText}>
          Choose a destination based on your travel style, budget,
          available time, and activities you enjoy.
        </Text>
      </View>

      <View style={{ height: 30 }} />
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
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#E8FFF5',
    fontSize: 15,
    marginTop: 5,
  },

  search: {
    backgroundColor: '#FFFFFF',
    marginTop: 18,
    padding: 15,
    borderRadius: 15,
    fontSize: 15,
  },

  categoryContainer: {
    marginTop: 18,
    paddingLeft: 20,
  },

  categoryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#D9E5DF',
  },

  categoryButtonSelected: {
    backgroundColor: '#FF6F61',
    borderColor: '#FF6F61',
  },

  categoryText: {
    color: '#173B35',
    fontWeight: '600',
  },

  categoryTextSelected: {
    color: '#FFFFFF',
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#173B35',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 12,
  },

  destinationContainer: {
    marginHorizontal: 20,
  },

  destinationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
  },

  destinationImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },

  destinationImagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#20C7C7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  destinationEmoji: {
    fontSize: 65,
  },

  destinationInfo: {
    padding: 17,
  },

  destinationName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#173B35',
  },

  location: {
    color: '#159A68',
    marginTop: 5,
    fontSize: 13,
    fontWeight: '600',
  },

  description: {
    color: '#65756F',
    marginTop: 8,
    lineHeight: 20,
  },

  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF0B5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 10,
  },

  tagText: {
    color: '#806900',
    fontSize: 12,
    fontWeight: 'bold',
  },

  empty: {
    alignItems: 'center',
    padding: 40,
  },

  emptyEmoji: {
    fontSize: 45,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#173B35',
    marginTop: 10,
  },

  emptyText: {
    color: '#65756F',
    marginTop: 5,
  },

  tipCard: {
    backgroundColor: '#FFD447',
    marginHorizontal: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 20,
  },

  tipTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#173B35',
  },

  tipText: {
    color: '#173B35',
    fontSize: 15,
    marginTop: 7,
    lineHeight: 21,
  },
});