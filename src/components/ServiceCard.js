// src/components/ServiceCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ServiceCard({ service, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {service.images && service.images[0] ? (
        <Image source={{ uri: service.images[0] }} style={styles.img} />
      ) : (
        <View style={[styles.img, {alignItems:'center',justifyContent:'center'}]}>
          <Text>No Img</Text>
        </View>
      )}
      <View style={{flex:1,paddingLeft:12}}>
        <Text style={styles.title}>{service.title}</Text>
        <Text>{service.category} • ₹{service.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card:{flexDirection:'row',padding:12,backgroundColor:'#fff',borderRadius:8,marginBottom:10,elevation:2},
  img:{width:80,height:80,borderRadius:8},
  title:{fontSize:16,fontWeight:'700'}
});