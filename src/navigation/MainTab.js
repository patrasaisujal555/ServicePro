// src/navigation/MainTab.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import ProviderDashboard from '../screens/ProviderDashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServiceDetail from '../screens/ServiceDetail';
import Booking from '../screens/Booking';
import ProfilePlaceholder from '../screens/ProfilePlaceholder';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} options={{ title: 'Service' }} />
      <Stack.Screen name="Booking" component={Booking} options={{ title: 'Book Service' }} />
    </Stack.Navigator>
  );
}

export default function MainTab() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Bookings" component={MyBookingsScreen} />
      <Tab.Screen name="Provider" component={ProviderDashboard} />
      <Tab.Screen name="Profile" component={ProfilePlaceholder} />
    </Tab.Navigator>
  );
}