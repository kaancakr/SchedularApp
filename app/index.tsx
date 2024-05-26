import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OpenScreen from '@/components/OpenScreen';
import { RootStackParamList } from '../constants/types'; // Adjust the import according to your project structure
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const Index: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="OpenScreen">
      <Stack.Screen name="OpenScreen" component={OpenScreen} options={{headerShown: false}} />
      <Stack.Screen name="MainScreen" component={MainNavigator} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

export default Index;
