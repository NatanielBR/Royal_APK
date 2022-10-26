import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screen/Home/Home";
import MovieDetail from "../Screen/MovieDetails/MovieDetail";
import Animes from "../Screen/Animes/Animes";
import Filmes from "../Screen/Filmes/Filmes";


import Download from "../Screen/Downloads/Download";
import Series from "../Screen/Series/Series";
import Trailer from "../Screen/TrailerView/Youtube";
import VideoP from "../Screen/VideoPlayer/Video";
import More from "../Screen/More/More";
import Episodes from "../Screen/Episodes/Episodes";

import Tabs from "../Components/BottomTabsScreen";
import Lista from "../Screen/Lista";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (

    <NavigationContainer independent>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MovieD"
          component={MovieDetail}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MoreOf"
          component={More}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Trailer"
          component={Trailer}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="VideoP"
          component={VideoP}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Episodes"
          component={Episodes}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Filmes"
          component={Filmes}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Series"
          component={Series}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Animes"
          component={Animes}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Downloads"
          component={Download}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Lista"
          component={Lista}
          options={{ headerShown: false }}
        />
      </Stack.Navigator >
    </NavigationContainer >
  );
};

/* const Stacks = () => {
  return (
    <NavigationContainer independent>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; */

export default Routes
