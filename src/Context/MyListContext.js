import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { createContext, useState } from 'react';

export const MyListContext = createContext(null);

export function MyListContextProvider(props) {
  const [myList, setMyList] = useState([]);

  const handleSetMyList = async item => {
    console.log('chamou');

    const verifyFilmeExist = myList.some(filme => filme.id === item.id);

    if (!verifyFilmeExist) {
      setMyList([...myList, item]);
    }

    return;
  };

  return (
    <MyListContext.Provider value={{ myList, handleSetMyList }}>
      {props.children}
    </MyListContext.Provider>
  );
}
