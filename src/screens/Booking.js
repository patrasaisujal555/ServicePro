// src/screens/Booking.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { createBooking } from '../utils/firestoreHelpers';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

export default function Booking({ route, navigation }) {
  const { service } = route.params;
  const { user } = useAuth();
  const [address,setAddress] = useState('');
  const [date,setDate] = useState(null);
  const [showPicker,setShowPicker] = useState(false);

  async function handleConfirm() {
    if (!address || !date) return alert('Enter address & pick date/time');
    try {
      await createBooking({
        userId: user.uid,
        serviceId: service.id,
        providerId: service.providerId || null,
        date: date,
        timeslot: format(date, 'yyyy-MM-dd HH:mm'),
        status: 'requested',
        address,
        pricePaid: service.price
      });
      alert('Booking requested');
      navigation.navigate('Bookings');
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <View style={{flex:1,padding:16}}>
      <Text style={{fontWeight:'700',fontSize:18}}>{service.title}</Text>
      <TextInput placeholder="Enter service address" value={address} onChangeText={setAddress} style={styles.input}/>
      <Button title={date ? `Selected: ${format(date,'dd MMM yyyy HH:mm')}` : 'Pick Date & Time'} onPress={()=>setShowPicker(true)} />
      <DateTimePickerModal
        isVisible={showPicker}
        mode="datetime"
        onConfirm={(d)=>{ setDate(d); setShowPicker(false); }}
        onCancel={()=>setShowPicker(false)}
      />
      <View style={{marginTop:20}}>
        <Button title="Confirm Booking (Dummy Payment)" onPress={handleConfirm}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input:{borderWidth:1,borderColor:'#ccc',padding:10,marginVertical:12,borderRadius:6}
});