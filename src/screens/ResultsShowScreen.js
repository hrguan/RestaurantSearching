import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';
import { MaterialIcons } from '@expo/vector-icons'; 

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam('id');

  const getResult = async id => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };
  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <MaterialIcons name="restaurant" style={styles.iconStyle}/>
        <Text style={styles.firstText}>{result.name}</Text>
      </View>
      <Text style={styles.location}>Address: {result.location.address1} </Text>
      <FlatList
        data={result.photos}
        showsVerticalScrollIndicator={false}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  firstText: {
    marginTop: 10,
    color: '#32875E',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  location: {
    color: '#050505',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    
  },
  image: {
    height: 300,
    width: 420,
    marginBottom: 10,
    borderRadius: 10,
  },
  iconStyle: {

    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    marginHorizontal: 15,
  
  }
});

export default ResultsShowScreen;
