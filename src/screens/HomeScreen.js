// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ServiceCard from '../components/ServiceCard';
import { fetchServices } from '../utils/firestoreHelpers';

export default function HomeScreen({ navigation }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const s = await fetchServices();
        setServices(s);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <View style={{flex:1,padding:12}}>
      <Text style={{fontSize:22,fontWeight:'700',marginBottom:12}}>Services</Text>
      <FlatList data={services} keyExtractor={i=>i.id} renderItem={({item})=>(
        <ServiceCard service={item} onPress={()=>navigation.navigate('ServiceDetail',{ serviceId: item.id })} />
      )} />
    </View>
  );
}