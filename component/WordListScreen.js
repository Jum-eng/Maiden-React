// src/WordListScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Text, Button } from 'react-native-paper';
import axios from 'axios';
import { white } from 'react-native';

const API_URL = 'https://api.datamuse.com/words?rel_rhy=example';

const WordListScreen = () => {
  const [wordList, setWordList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchWordList();
  }, []);

  const fetchWordList = async () => {
    try {
      const response = await axios.get(API_URL);
      setWordList(response.data);
    } catch (error) {
      console.error('Error fetching word list:', error);
    }
  };

  const regenerateWords = async () => {
    fetchWordList();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchWordList();
    setRefreshing(false);
  };

  const sortByWord = () => {
    const sortedList = [...wordList].sort((a, b) => a.word.localeCompare(b.word));
    setWordList(sortedList);
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.wordText}>{item.word}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={regenerateWords}
        style={styles.regenerateButton}
      >
        Sort words
      </Button>
      <FlatList
        data={wordList}
        renderItem={renderItem}
        keyExtractor={(item) => item.word}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={sortByWord}
          style={styles.sortButton}
        >
          Sort Alphabetically
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FCFF',
    paddingVertical: 26,
    paddingHorizontal: 14,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 14,
    color: '#333',
  },
  regenerateButton: {
    marginBottom: 14,
    backgroundColor: '#F4C0CB',

  },
  sortButton: {
    marginTop: 14,
    backgroundColor: '#F4C0CB',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 14,
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
  },
  wordText: {
    fontSize: 18,
    color: '#555',
  },
});

export default WordListScreen;
