import Schedule from './screens/Schedule';
import ChooseDay from './screens/ChooseDay';
import HomeScreen from './screens/HomeScreen';
import GPACalculator from './screens/GPACalculator';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          headerShown: true,
          title: 'UNIVERSITY HELPER'  
        }} 
      />
      <Stack.Screen 
        name="ChooseDay" 
        component={ChooseDay}
        options={{
          headerShown: true,
          title: 'Choose Day',
        }} 
      />
      <Stack.Screen 
        name="GPACalculator" 
        component={GPACalculator}
        options={{
          headerShown: true,
          title: 'GPA Calculator',
        }} 
      />
       <Stack.Screen 
        name="Schedule" 
        component={Schedule}
        options={{
          headerShown: true,
          title: 'Schedule'  
        }} 
      />
    </Stack.Navigator>
  </NavigationContainer>

);

export default App;