// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ServicePro</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',padding:20},
  title:{fontSize:28,fontWeight:'700',textAlign:'center',marginBottom:20},
  input:{borderWidth:1,borderColor:'#ccc',padding:12,borderRadius:8,marginBottom:12},
  link:{color:'#007bff',marginTop:12,textAlign:'center'}
});