// src/screens/ServiceDetail.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet } from 'react-native';
import { fetchServiceById } from '../utils/firestoreHelpers';

export default function ServiceDetail({ route, navigation }) {
  const { serviceId } = route.params;
  const [service, setService] = useState(null);

  useEffect(() => {
    (async () => {
      const s = await fetchServiceById(serviceId);
      setService(s);
    })();
  }, [serviceId]);

  if (!service) return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>Loading...</Text></View>;

  return (
    <ScrollView style={{flex:1,padding:12}}>
      {service.images && service.images[0] && <Image source={{ uri: service.images[0] }} style={styles.img} />}
      <Text style={styles.title}>{service.title}</Text>
      <Text style={{marginTop:8}}>{service.description}</Text>
      <Text style={{marginTop:10,fontWeight:'700'}}>Price: ₹{service.price}</Text>
      <View style={{marginTop:20}}>
        <Button title="Book Service" onPress={() => navigation.navigate('Booking', { service })} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img:{width:'100%',height:200,borderRadius:8},
  title:{fontSize:20,fontWeight:'700',marginTop:12}
});