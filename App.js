import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {getTrendingGifs} from './src/api/getTrendingGifs';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const [data, setData] = useState([]);

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

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.gifContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gifContainer: {
    flex: 1,
  },
  gif: {
    height: 200,
    width: 200,
  },
});

export default App;
