import React, { useEffect } from 'react';
import { MyListContextProvider } from './Context/MyListContext';
import Router from '../src/routes';
import 'react-native-gesture-handler';
import { requestUserPermission, NotificationServices, getNotficationToken } from './Components/NotificationHelper';





function App() {
  useEffect(() => {
    requestUserPermission();
    getNotficationToken();
    NotificationServices();
  }, []);


  return (
    <MyListContextProvider>
      <Router />
    </MyListContextProvider>
  );
}
export default App;
