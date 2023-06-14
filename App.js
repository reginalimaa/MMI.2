import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/maquinaReducer'; 
import Homee from './src/screens/homee'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateMachine from './src/screens/machine';

const store = createStore(rootReducer);
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Homee" component={Homee} />
          <Stack.Screen name="CreateMachine" component={CreateMachine} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;