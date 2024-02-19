import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {getTrendingGifs} from '../../api/getTrendingGifs';
import {styles} from '../styles/styles';

export const RenderGifs = () => {
  const [gifsData, setGifsData] = useState([]);

  const [searchText, setSearchText] = useState('');

  const [isDarkMode, setIsDarkMode] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    padding: 10,
  };

  const themeColor = {
    color: isDarkMode ? Colors.lighter : Colors.darker,
  };

  const getData = async () => {
    const response = await getTrendingGifs();
    if (response.meta.msg !== 'OK' || response === undefined) {
      Alert.alert('Something went wrong! Please try again later!');
    } else {
      const gifs = response.data.map(item => {
        return {
          url: item.images.original.url.split('?')[0],
          id: item.id,
          title: item.title,
        };
      });
      setGifsData(gifs);
    }
  };

  const renderItem = ({item}) => (
    <Image
      style={styles.gif}
      source={{
        uri: item.url,
      }}
    />
  );

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
        <View style={styles.themeToggleContainer}>
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
          data={gifsData.filter(item =>
            item.title.toLowerCase().includes(searchText.toLowerCase()),
          )}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};
