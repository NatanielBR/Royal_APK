import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Welcome from './Screen/Welcome/Welcome';
import SignUp from './Screen/SignUp/SignUp';
import Login from './Screen/Login/Login';
import Home from './Screen/Home/Home';
import MovieDetail from './Screen/MovieDetails/MovieDetail';
import Anime from './Screen/Animes/Animes';
import Filme from './Screen/Filmes/Filmes';
import Download from './Screen/Downloads/Download';
import Serie from './Screen/Series/Series';
import Trailer from './Screen/TrailerView/Youtube';
import VideoP from './Screen/VideoPlayer/Video';
import More from './Screen/More/More';
import Episodes from './Screen/Episodes/Episodes';

import Tabs from './Components/BottomTabsScreen';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer independent>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="MovieD"
          component={MovieDetail}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="MoreOf"
          component={More}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Trailer"
          component={Trailer}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="VideoP"
          component={VideoP}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Episodes"
          component={Episodes}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Filmes"
          component={Filme}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Series"
          component={Serie}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Animes"
          component={Anime}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Downloads"
          component={Download}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
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

export default Main;
