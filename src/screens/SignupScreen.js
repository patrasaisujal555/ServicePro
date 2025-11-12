// src/screens/SignupScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export default function SignupScreen({ navigation }) {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  async function handleSignup() {
    try {
      const res = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(res.user, { displayName: name });
      await setDoc(doc(db, 'users', res.user.uid), {
        name,
        email,
        role: 'user',
        createdAt: serverTimestamp()
      });
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <TextInput placeholder="Full name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address"/>
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Sign up" onPress={handleSignup} />
      <Text style={{textAlign:'center',marginTop:10}} onPress={()=>navigation.goBack()}>Back to login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',padding:20},
  title:{fontSize:20,fontWeight:'700',textAlign:'center',marginBottom:16},
  input:{borderWidth:1,borderColor:'#ccc',padding:12,borderRadius:8,marginBottom:12}
});