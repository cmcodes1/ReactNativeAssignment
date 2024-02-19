import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {getTrendingGifs} from './src/api/getTrendingGifs';

const App = () => {
  const [data, setData] = useState([]);

  const [searchText, setSearchText] = useState('');

  const [isDarkMode, setIsDarkMode] = useState(false);

  const getData = async () => {
    const response = await getTrendingGifs();
    // console.log('response', response);
    const gifs = response.data.map(item => {
      return {
        url: item.images.original.url.split('?')[0],
        id: item.id,
        title: item.title,
      };
    });
    console.log('gifs', gifs);
    setData(gifs);
  };

  const renderItem = ({item}) => (
    <Image
      style={styles.gif}
      source={{
        uri: item.url,
      }}
    />
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    padding: 10,
  };

  const themeColor = {
    color: isDarkMode ? Colors.lighter : Colors.darker,
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={backgroundStyle}>
        <View style={styles.themeToggle}>
          <TouchableOpacity
            style={[styles.themeButton, {borderColor: themeColor.color}]}
            onPress={() => setIsDarkMode(false)}>
            <Text style={themeColor}>Light Mode</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.themeButton, {borderColor: themeColor.color}]}
            onPress={() => setIsDarkMode(true)}>
            <Text style={themeColor}>Dark Mode</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          value={searchText}
          placeholder={'Search GIFs'}
          style={[
            styles.searchBox,
            {
              color: themeColor.color,
              borderColor: themeColor.color,
            },
          ]}
          placeholderTextColor={themeColor.color}
          onChangeText={text => setSearchText(text)}
        />

        <FlatList
          data={data.filter(item =>
            item.title.toLowerCase().includes(searchText.toLowerCase()),
          )}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  themeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  themeButton: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchBox: {
    height: 50,
    padding: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  gif: {
    height: 200,
    width: 200,
  },
});

export default App;
