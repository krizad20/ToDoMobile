import { Kanit_400Regular, useFonts } from '@expo-google-fonts/kanit';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Credits from './Credits';
import Main from './Main';
import SignIn from './SignIn';
import SignOut from './SignOut';

function HomeTabs() {
  const Tab = createBottomTabNavigator();
  let [fontsLoaded] = useFonts({
    Kanit_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Main}
        //icon
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ color: color, fontFamily: 'Kanit_400Regular' }}>Home</Text>
          ),
          headerShown: false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          //hide name
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen name="Credits" component={Credits}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ color: color, fontFamily: 'Kanit_400Regular' }}>Credits</Text>
          ),
          headerShown: false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          //hide name
          tabBarLabel: () => null,
        }} />
      <Tab.Screen name="SignOut" component={SignOut}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ color: color, fontFamily: 'Kanit_400Regular' }}>Sign Out</Text>
          ),
          headerShown: false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          //hide name
          tabBarLabel: () => null,
        }} />
    </Tab.Navigator>
  );
}
export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignIn'>
        <Stack.Screen
          name="Main"
          component={HomeTabs}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          //hide header text
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
