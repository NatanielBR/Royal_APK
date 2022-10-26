import React, { useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { NavigationContainer, StackActions, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Color from "../Assets/ColorPallet";

import Home from "../Screen/Home/Home";
import Series from "../Screen/Series/Series";
import Animes from "../Screen/Animes/Animes";
import Filmes from "../Screen/Filmes/Filmes";
import MovieD from "../Screen/MovieDetails/MovieDetail";
import Episodes from "../Screen/Episodes/Episodes";

import PlayIcon from "../Assets/Icons/playTranparent.png";
import SerieIcon from "../Assets/Icons/film-reel.png";
import AnimeIcon from "../Assets/Icons/anime-berserk.png";
import HomeIcon from "../Assets/Icons/Home-filled.png";
import Filme from "../Screen/Filmes/Filmes";
import { assertSourceType } from "@babel/core/lib/config/validation/option-assertions";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


/**
 *
 * @param navigation
 */
function safePopToTop(navigation) {
  // let actions = StackActions.popToTop();
}

const Tabs = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="HomeD"
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          height: 55,
          borderColor: Color.tabColor,
          backgroundColor: Color.tabColor,
          ...styles.shadow,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="HomeD"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              onPress={() => {
                safePopToTop(navigation);
                navigation.navigate("HomeD");
              }}>
              <View style={styles.tabPart}>
                <Image
                  source={HomeIcon}
                  style={{
                    width: 23,
                    height: 23,
                    tintColor: focused
                      ? `${Color.tabActive}`
                      : `${Color.tabInactive}`,
                  }}
                />
                <Text
                  style={{
                    color: focused
                      ? `${Color.tabActive}`
                      : `${Color.tabInactive}`,
                    fontWeight: "500",
                    fontSize: 10,
                  }}>
                  Home
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Film"
        component={Filmes}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              onPress={(e) => {
                navigation.navigate("Film")
              }}
            >
              <View style={styles.tabPart}>
                <Image
                  source={PlayIcon}
                  style={{
                    width: 23,
                    height: 23,
                    tintColor: focused
                      ? `${Color.tabActive}`
                      : `${Color.tabInactive}`,
                  }}
                />
                <Text
                  style={{
                    color: focused
                      ? `${Color.tabActive}`
                      : `${Color.tabInactive}`,
                    fontWeight: "500",
                    fontSize: 10,
                  }}>
                  Filmes
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Serie"
        component={Series}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Serie");
              }}
            >
              <View style={styles.tabPart}>
                <Image
                  source={SerieIcon}
                  style={{
                    width: 23,
                    height: 23,
                    tintColor: focused
                      ? `${Color.tabActive}`
                      : `${Color.tabInactive}`,
                  }}
                />
                <Text
                  style={{
                    color: focused
                      ? `${Color.tabActive}`
                      : `${Color.tabInactive}`,
                    fontWeight: "500",
                    fontSize: 10,
                  }}>
                  Séries
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />


      <Tab.Screen
        name="Animes"
        getComponent={() => Animes}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabPart}>
              <Image
                source={AnimeIcon}
                style={{
                  width: 23,
                  height: 23,
                  tintColor: focused
                    ? `${Color.tabActive}`
                    : `${Color.tabInactive}`,
                }}
              />
              <Text
                style={{
                  color: focused
                    ? `${Color.tabActive}`
                    : `${Color.tabInactive}`,
                  fontWeight: "500",
                  fontSize: 10,
                }}>
                Animes
              </Text>
            </View>
          ),
        }}
      />

      {/*<Tab.Screen*/}
      {/*  name="Downloads"*/}
      {/*  component={Downloads}*/}
      {/*  options={{*/}
      {/*    headerShown: false,*/}
      {/*    tabBarIcon: ({focused}) => (*/}
      {/*      <View style={styles.tabPart}>*/}
      {/*        <Image*/}
      {/*          source={DownloadsIcon}*/}
      {/*          style={{*/}
      {/*            width: 23,*/}
      {/*            height: 23,*/}
      {/*            tintColor: focused*/}
      {/*              ? `${Color.tabActive}`*/}
      {/*              : `${Color.tabInactive}`,*/}
      {/*          }}*/}
      {/*        />*/}
      {/*        <Text*/}
      {/*          style={{*/}
      {/*            color: focused*/}
      {/*              ? `${Color.tabActive}`*/}
      {/*              : `${Color.tabInactive}`,*/}
      {/*            fontWeight: '500',*/}
      {/*            fontSize: 10,*/}
      {/*          }}>*/}
      {/*          Download*/}
      {/*        </Text>*/}
      {/*      </View>*/}
      {/*    ),*/}
      {/*  }}></Tab.Screen>*/}
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  tabPart: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    top: 1,
  },
});
