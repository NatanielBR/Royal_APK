// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';

// import Colors from '../../Assets/ColorPallet';

// import Header from '../../Components/Header';
// import MoviePoster from '../../Components/MoviePoster';
// import BottomTab from '../../Components/BottomTab';

// import axios from '../../API/RoyalApi';
// import endPoints from '../../API/EndPoints';

// import requests from '../../Axios/Requests';

// const Animes = ({ navigation }) => {
//   const [anime, setAnime] = useState([]);

//   useEffect(() => {
//     async function fetch() {
//       const req = await axios.get(`${endPoints.genre}Anime`, {
//         headers: {
//           Accept: 'application/json',
//           'User-Agent': 'axios 0.21.1',
//         },
//       });

//       console.log(req.data);
//       setAnime(req.data.movies.rows);
//       return req;
//     }
//     fetch();
//   }, [navigation]);

//   console.log(anime)

//   return (
//     <View style={styles.body}>
//       <Header />
//       {/* <BottomTab /> */}
//       <View style={{ flex: 1, width: '100%' }}>
//         <ScrollView>
//           <View style={styles.animesRow}>
//             {anime?.map(animes => {
//               return (
//                 <TouchableOpacity
//                   key={animes.id}
//                   onPress={() => {
//                     navigation.navigate('MovieD', { itemId: animes.id });
//                   }}>
//                   <MoviePoster
//                     key={animes.imdbid}
//                     poster={animes.posterImage}
//                     movieName={animes.title}
//                     rate={animes.ratings}
//                     year={animes.year}
//                     likes={animes.votes}
//                   />
//                 </TouchableOpacity>
//               );
//             })}
//           </View>
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// export default Animes;

// const styles = StyleSheet.create({
//   body: {
//     flex: 1,
//     flexWrap: 'wrap',
//     alignItems: 'center',
//     backgroundColor: Colors.bGColor,
//   },
//   animesRow: {
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingTop: 6,
//     paddingBottom: 48,
//   },
// });
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../Assets/ColorPallet';

import Header from '../../Components/Header';
import BottomTab from '../../Components/BottomTab';

import MoviePoster from '../../Components/MoviePoster';

import axios from '../../API/RoyalApi';
import endPoints from '../../API/EndPoints';

const Animes = ({ navigation }) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', async function fetch() {
      const req = await axios.get(`${endPoints.getAnime}`);
      setSeries(req.data.results.rows);
      return req;
    });
  }, []);

  return (
    <View style={styles.body}>
      <Header />

      <View style={{ flex: 1, width: '100%', paddingBottom: 16 }}>
        <ScrollView style={{ width: '100%', flex: 1 }}>
          <View style={styles.seriesRow}>
            {series.map(serie => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MovieD', {
                      Item: serie,
                      Type: true,
                    });
                  }}
                  key={serie.id}>
                  <MoviePoster
                    key={serie.id}
                    poster={serie.poster}
                    movieName={serie.title || serie.name}
                    rate={serie.ratings}
                    year={serie.year}
                    likes={serie.votes}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Animes;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: Colors.bGColor,
  },
  seriesRow: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 6,
    paddingBottom: 48,
  },
});

