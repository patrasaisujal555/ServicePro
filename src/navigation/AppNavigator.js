// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainTab from './MainTab';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function AppNavigator() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainTab /> : <AuthStack />}
    </NavigationContainer>
  );
}