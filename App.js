import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/maquinaReducer'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Homee from './src/screens/homee'
import CreateMachine from './src/screens/machine';
import UpdateAndDelete from './src/screens/updateAndDelete';
import QRCode from './src/screens/qrCode';

const store = createStore(rootReducer);
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Homee" component={Homee} />
          <Stack.Screen name="CreateMachine" component={CreateMachine} />
          <Stack.Screen name="UpdateAndDelete" component={UpdateAndDelete} />
          <Stack.Screen name="QRCode" component={QRCode} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;