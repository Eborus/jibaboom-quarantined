import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, Image, Header } from 'react-native';

import JsonView from './components/jsonView';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.header}>
          <Image source={require('./images/MusicFestival.png')} style={styles.image} />
          {/* Hamburger Menu */}
        </View>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <Text style={styles.text}>DataTable</Text>
          <JsonView />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};



const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#191919',
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  header: {
    backgroundColor: '#000000'
  },
  text:{
    color: '#999999',
    textAlign: "center",
    fontSize: 37.5
  }
});

export default App;
