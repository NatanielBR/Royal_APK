import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MoviePoster from "../../Components/MoviePoster";
import styles from "./styles";

import ImageClose from "../../Assets/Icons/left-arrow.png";

export default function Lista() {
  const [listStorage, setListStorage] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchListStorage() {
      const myList = await AsyncStorage.getItem("myList");

      setListStorage(Object.values(JSON.parse(myList)));
    }

    fetchListStorage();
  }, []);

  const updateListStorage = async () => {
    let nList = {};

    listStorage.forEach((item) => {
      nList[item.Imdbid] = item;
    });

    await AsyncStorage.setItem("myList", JSON.stringify(nList));
  };

  return (
    <View style={styles.body}>

      <SafeAreaView styles={{ flex: 1, height: 50, width: "100%" }}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnBack}>


            <Image source={ImageClose} style={styles.imageBack} />

          </TouchableOpacity>

          <Text style={styles.title}>Minha Lista</Text>
        </View>
      </SafeAreaView>
      <ScrollView
        overScrollMode="never">
        <View style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
          {listStorage?.map((movie, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate("MovieD", {
                      Item: movie,
                      ID: movie.Imdbid,
                      Type: movie.typeItem,
                    });
                  }}
                  onLongPress={async () => {
                    delete listStorage[index];

                    await updateListStorage();

                    setListStorage([])
                    setListStorage(listStorage)
                  }}
                >
                  <MoviePoster
                    bdS={{ margin: 16 }}
                    key={movie.Imdbid}
                    poster={movie.poster}
                    movieName={movie.title}
                    rate={movie.ratings}
                    year={movie.year}
                    likes={movie.votes}
                  />
                </TouchableOpacity>
              );
            },
          )}


        </View>
      </ScrollView>
    </View>
  );
}
