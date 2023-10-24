import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './assets/screens/HomeScreen';
import ListScreen from './assets/screens/ListScreen';
import DetailItem from './assets/screens/DetailItem';

import { ApolloProvider } from '@apollo/client';
import client from './config';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const StackDetail = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List Item"
        component={ListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail Item" component={DetailItem} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarLabelStyle: {
              fontSize: 15,
            },
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'List') {
                iconName = focused ? 'list' : 'list-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="List" component={StackDetail} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
