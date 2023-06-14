import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/maquinaReducer'; 
import Homee from './src/screens/homee'

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <Homee/>
    </Provider>
  );
};

export default App;

