// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 import WordListScreen from './component/WordListScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="WordList" component={WordListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
