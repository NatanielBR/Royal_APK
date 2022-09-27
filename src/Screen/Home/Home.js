import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './Style';


const hash1 = '5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25'

import PlayIcon from '../../Assets/Icons/play.png';
import RandomIcon from '../../Assets/Icons/random.png';
import NewsIcon from '../../Assets/Icons/newspaper.png';
import LaptopIcon from '../../Assets/Icons/laptop.png';
import { WebView } from 'react-native-webview';
import TvIcon from '../../Assets/Icons/tv-monitor.png';
import YoutubeIcon from '../../Assets/Icons/icon-youtube.png';
import IconPlus from '../../Assets/Icons/white-plus.png';
import IconInfo from '../../Assets/Icons/info.png';
import IconClose from '../../Assets/Icons/icon-close.png';
import ListIcon from '../../Assets/Icons/list.png';

import Colors from '../../Assets/ColorPallet';
import BannerHeader from '../../Components/BannerHeader';
import BottomTab from '../../Components/BottomTab';
import Header from '../../Components/Header';
import axios from '../../API/RoyalApi';

import endPoints from '../../API/EndPoints';
import {
    MyListContextProvider,
    MyListContext,
} from '../../Context/MyListContext';
import Youtube from '../TrailerView/Youtube';

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
}

function ScrollItems({ Icon, Desc, Press }) {
    return (
        <TouchableOpacity onPress={Press} style={styles.scroolBtns}>
            <Image style={styles.scrollBtnIcons} source={Icon} />
            <Text style={styles.scrollBtnsText}>{Desc}</Text>
        </TouchableOpacity>
    );
}

export default function Home() {
    const navigation = useNavigation();
    const { handleSetMyList } = useContext(MyListContext);
    const [banner, setBanner] = useState([]);
    const [random, setRandom] = useState([]);
    const [rand, setRand] = useState([]);
    const [stat, setStat] = useState([]);
    const [playTrailer, setPlayTrailer] = useState(false);
    const [toggleRandom, setToggleRandom] = useState(false);
    const [bannerDisplay, setBannerDisplay] = useState('none');

    function getRandomSafe(length) {
        let rand = Math.random();
        let position = Math.floor(rand * length - 1);

        if (position < 0) {
            return 0;
        } else {
            return position;
        }
    }

    useEffect(() => {
        async function fetchBannerInfo() {
            const request = await axios
                .get(`${endPoints.all}`, {
                    headers: {
                        Accept: 'application/json',
                        'User-Agent': 'axios 0.21.1',
                    },
                })
                .catch(() => {
                    return 0;
                });

            setRand(
                request.data.results.rows[
                getRandomSafe(request.data.results.rows.length)
                ],
            );
            setBanner(
                request.data.results.rows[
                getRandomSafe(request.data.results.rows.length)
                ],
            );


            setBannerDisplay('flex');

            return request;
        }

        fetchBannerInfo();
    }, [navigation, toggleRandom]);

    const toMain = () => {
        navigation.navigate('Home');
    };
    const randomMovie = () => {
        if (rand.length === 0) {
            return;
        }
        navigation.navigate('MovieD', { Item: rand });
        setToggleRandom(!toggleRandom);
    };
    const m = () => {
        navigation.navigate('MoreOf', { itemId: 50, genre: 'Action' });
    };

    const final = {
        uri: `https://image.tmdb.org/t/p/original${banner?.poster}`,
    };


    return (
        <ImageBackground
            source={final}
            resizeMode="cover"
            width={500}
            style={style.body}>
            <BannerHeader MainPress={toMain} />

            <View
                style={{
                    width: '100%',
                    height: '40%',
                    alignItems: 'center',
                    display: bannerDisplay,
                }}>
                <Text style={styles.movieStatus}>
                    {stat.status == 'Released' ? 'Já disponível' : ''}
                </Text>
                <Text style={styles.movieName}>{truncate(banner?.title, 16)}</Text>
                <Text style={styles.movieRate}>{banner?.genre}</Text>

                <TouchableOpacity
                    onPress={() => {
                        // console.log(banner, "bla")
                        // navigation.navigate('MovieD', {Item: banner});
                        navigation.navigate('MovieD', {
                            Item: banner,
                            ID: banner.Imdbid,
                            url: endPoints.all,
                        });
                    }}
                    style={styles.watchBtn}>
                    <Text style={{ color: 'white', fontSize: 19 }}>Assistir</Text>
                    <Image source={PlayIcon} style={style.iconsPlay} />
                </TouchableOpacity>
            </View>

            <View style={styles.centerInfo}>
                {!playTrailer && (
                    <>
                        <TouchableOpacity
                            onPress={() => handleSetMyList(banner)}
                            style={styles.buttonStyledInfo}>
                            <Image source={IconPlus} />
                            <Text style={styles.textButtonInfos}>Minha lista </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setPlayTrailer(true)}
                            style={styles.buttonStyledbuttonStyledInfo}>
                            <Image source={YoutubeIcon} style={styles.iconStyle} />
                            <Text style={styles.textButtonInfos}> Trailer </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonStyledInfo}>
                            <Image source={IconInfo} style={styles.iconStyle} />
                            <Text style={styles.textButtonInfos}>Saiba mais </Text>
                        </TouchableOpacity>
                    </>
                )}
                {playTrailer && (
                    <View>
                        <TouchableOpacity
                            onPress={() => setPlayTrailer(false)}
                            style={{ alignItems: 'flex-end', paddingRight: 10 }}>
                            <Image source={IconClose} />
                        </TouchableOpacity>
                        <Youtube videoId={banner.trailerId} />
                    </View>
                )}
            </View>

            <LinearGradient
                useAngle={true}
                angle={180}
                angleCenter={{ x: 0.1, y: 0.7 }}
                colors={['transparent', 'rgba(0, 0, 0, 2)']}
                style={styles.scrollBody}>
                <ScrollView horizontal>
                    <ScrollItems Icon={NewsIcon} Desc={'Notícias do Royal'} />

                    <ScrollItems
                        Press={randomMovie}
                        Icon={RandomIcon}
                        Desc={'Filme aleatório'}
                    />

                    <ScrollItems Icon={LaptopIcon} Desc={'Assistir no computador'} />

                    <ScrollItems Icon={TvIcon} Desc={'Assistir na TV'} />
                    {/*
          <ScrollItems Icon={ListIcon} Desc={'Adicionar a lista'} />
           */}
                </ScrollView>
            </LinearGradient>
            {/*  <BottomTab /> */}
        </ImageBackground>
    );
}

const style = StyleSheet.create({
    body: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.bGColor,
    },

    iconsPlay: {
        width: 30,
        height: 30,
        marginLeft: 10,
    }
});
