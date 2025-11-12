// src/screens/MyBookingsScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { fetchBookingsForUser } from '../utils/firestoreHelpers';

export default function MyBookingsScreen() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const b = await fetchBookingsForUser(user.uid);
      setBookings(b);
    })();
  }, [user]);

  return (
    <View style={{flex:1,padding:12}}>
      <FlatList data={bookings} keyExtractor={i=>i.id} renderItem={({item})=>(
        <View style={styles.card}>
          <Text style={{fontWeight:'700'}}>{item.timeslot}</Text>
          <Text>Status: {item.status}</Text>
          <Text>Price: ₹{item.pricePaid}</Text>
        </View>
      )} ListEmptyComponent={<Text>No bookings yet.</Text>} />
    </View>
  );
}

const styles = StyleSheet.create({
  card:{padding:12,backgroundColor:'#fff',borderRadius:8,marginBottom:10}
});