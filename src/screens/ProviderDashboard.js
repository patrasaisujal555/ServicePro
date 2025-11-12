// src/screens/ProviderDashboard.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { query, collection, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export default function ProviderDashboard() {
  const PROVIDER_ID = 'provider_1'; // During dev, some services have providerId = provider_1
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    (async () => {
      const q = query(collection(db, 'bookings'), where('providerId','==',PROVIDER_ID));
      const snap = await getDocs(q);
      setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    })();
  }, []);

  async function accept(bid) {
    await updateDoc(doc(db, 'bookings', bid), { status: 'accepted' });
    setBookings(bs => bs.map(b => b.id === bid ? { ...b, status: 'accepted' } : b));
  }

  return (
    <View style={{flex:1,padding:12}}>
      <FlatList data={bookings} keyExtractor={i=>i.id} renderItem={({item})=>(
        <View style={{padding:12,backgroundColor:'#fff',marginBottom:10,borderRadius:8}}>
          <Text style={{fontWeight:'700'}}>{item.timeslot}</Text>
          <Text>{item.address}</Text>
          <Text>Status: {item.status}</Text>
          {item.status === 'requested' && <Button title="Accept" onPress={()=>accept(item.id)} />}
        </View>
      )} ListEmptyComponent={<Text>No incoming bookings.</Text>} />
    </View>
  );
}