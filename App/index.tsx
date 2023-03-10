import React from 'react';
import { Provider } from 'react-redux';
import MainStack from './Navigations/MainStack';
import store from './Utils/Store';

function Index() {
  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
}
export default Index;
