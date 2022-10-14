import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import axios from 'axios';

import Header from '../../Components/Header';
import MovieRow from '../../Components/MovieRow';

import request from '../../Axios/Requests';

import Colors from '../../Assets/ColorPallet';

const Filmes = ({navigation}) => {
const [imdbId, setImdbId] = useState([]);
const [is, setIs] = useState({});
const [dbFilm, setDBFilm] = useState([]);
const [n, setN] = useState(0);

const array = [];

useEffect(() => {
async function fetchDB() {
const req = await axios.get(
'https://testeroyal.herokuapp.com/film/management/all',
);
setImdbId(req.data);

      return req;
    }
    fetchDB();

}, [, navigation]);

navigation.addListener('focus', () => {
setN(n + 1);
console.log('||||||||||||||||||||||||||');
});

useEffect(() => {
async function fetching() {
imdbId.map(async (item, index) => {
const find = await axios
.get(
`https://api.themoviedb.org/3/find/${item.IMDBid}?api_key=5a7e859a062b26ef282595be083f07fb&language=pt-BR&external_source=imdb_id`,
)
.then(e => (array[index] = e.data.movie_results[0]))
.catch(er => console.log(er));
});
setDBFilm(array);
}
fetching();
}, [, imdbId, n]);

const fecthes = {
action: request.fetchActionMovies,
upcoming: request.fetchUpcoming,
comedy: request.fetchComedyMovies,
horror: request.fetchHorrorMovies,
romance: request.fetchRomanceMovies,
topRated: request.fetchTopRated,
documentaries: request.fetchDocumentaries,
};
const more = {
available: () =>
navigation.navigate('MoreOf', {
Genre: 'Disponíveis',
fetch: 'https://testeroyal.herokuapp.com/film/management/all',
db: dbFilm,
}),
action: () =>
navigation.navigate('MoreOf', {
Genre: 'Acção',
fetch: fecthes.action,
}),
comedy: () =>
navigation.navigate('MoreOf', {
Genre: ' Comédia',
fetch: fecthes.comedy,
}),
romance: () =>
navigation.navigate('MoreOf', {
Genre: ' Romance',
fetch: fecthes.romance,
}),
topRated: () =>
navigation.navigate('MoreOf', {
Genre: ' Mais assistidos',
fetch: fecthes.topRated,
}),
horror: () =>
navigation.navigate('MoreOf', {
Genre: ' Horror',
fetch: fecthes.horror,
}),
upcoming: () =>
navigation.navigate('MoreOf', {
Genre: ' Lançamentos',
fetch: fecthes.upcoming,
db: imdbId,
}),
documentary: () =>
navigation.navigate('MoreOf', {
Genre: ' Documentários',
fetch: fecthes.documentaries,
}),
};

return (
<View style={styles.body}>
<Header />

      <ScrollView style={styles.scrollBody}>
        <View style={styles.scrollContainer}>
          <MovieRow
            Plus={more.upcoming}
            Genre={'Disponiveis'}
            requested={'https://testeroyal.herokuapp.com/film/management/all'}
            db={true}
            dbMovies={dbFilm}
            dbInfo={imdbId}
            ch={n}
          />
          <MovieRow
            Plus={more.upcoming}
            Genre={'Lançamentos'}
            requested={fecthes.upcoming}
          />
          <MovieRow
            Plus={more.topRated}
            Genre={'Mais Assistidos'}
            requested={fecthes.topRated}
          />
          <MovieRow
            Plus={more.action}
            Genre={'Acção'}
            requested={fecthes.action}
          />
          <MovieRow
            Plus={more.comedy}
            Genre={'Comédia'}
            requested={fecthes.comedy}
          />
          <MovieRow
            Plus={more.romance}
            Genre={'Romance'}
            requested={fecthes.romance}
          />
          <MovieRow
            Plus={more.horror}
            Genre={'Horror'}
            requested={fecthes.horror}
          />
          <MovieRow
            Plus={more.documentary}
            Genre={'Documentários'}
            requested={fecthes.documentaries}
          />
        </View>
      </ScrollView>
    </View>

);
};

export default Filmes;

const styles = StyleSheet.create({
body: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
backgroundColor: Colors.bGColor,
paddingBottom: 24,
},
scrollBody: {
flex: 1,
width: '100%',
},
});
