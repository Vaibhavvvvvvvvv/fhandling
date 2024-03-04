import React from 'react';
import { Provider } from 'react-redux';
import Form from './component/Form';
import store from './Redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Form />
    </Provider>
  );
};

export default App;
