import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react'
import { createContext, useState } from 'react';

export const MyListContext = createContext(null);


export function MyListContextProvider(props) {
  const [myList, setMyList] = useState([]);



  const handleSetMyList = async (item) => {
    const request = await AsyncStorage.getItem('myList');
    const requestParse = JSON.parse(request);



    const newList = [...requestParse, item];

    // const checkExists = newList.some((movie) => movie.Imdbid === item.Imdbid);

    await AsyncStorage.setItem('myList', JSON.stringify(newList));
  }


  return (
    <MyListContext.Provider value={{ myList, handleSetMyList }} >
      {props.children}
    </MyListContext.Provider>
  )
}