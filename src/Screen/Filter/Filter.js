import React, {useContext} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {BlurView} from '@react-native-community/blur';

import styles from './Style';
import {moreContext} from '../../Context/ContextApi';

const Filter = () => {
  const {filter, setFilter} = useContext(moreContext);

  return (
    <Modal transparent visible={filter} style={styles.body}>
      <BlurView
        style={styles.blur}
        blurType="dark"
        blurAmount={1}
        reducedTransparencyFallbackColor="white"
      />
      <TouchableOpacity
        onPress={() => {
          setFilter(false);
        }}
        style={styles.bigBtn}></TouchableOpacity>
      <Animatable.View
        animation="slideInUp"
        duraton="1500"
        style={styles.container}></Animatable.View>
    </Modal>
  );
};

export default Filter;

/**
 * <ImageBackground
          source={final}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <DetailHead Trailer={trailer} Back={back} />

          <CustomModal visible={togglePlayerOptions}>
            <View style={{alignSelf: 'flex-end', marginBottom: 8}}>
              <TouchableOpacity
                onPress={() => {
                  setTogglePlayerOptions(false);
                }}
                style={styles.modalHeader}>
                <Image source={CloseIcon} style={styles.modalIcon} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('VideoP', {data: item.id});
              }}
              style={styles.option}>
              <Text style={styles.modalTxt}> Legendado </Text>
              <Image source={PlayFilledIcon} style={styles.modalIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <Text style={styles.modalTxt}> Dublado </Text>
              <Image source={PlayFilledIcon} style={styles.modalIcon} />
            </TouchableOpacity>
          </CustomModal>

          <TouchableOpacity onPress={itemOptions} style={styles.watchBtn}>
            <Image source={PlayIcon} style={styles.icon} />
          </TouchableOpacity>

          <LinearGradient
            useAngle={true}
            angle={180}
            angleCenter={{x: 0.1, y: 0.3}}
            start={{x: 1, y: 0.5}}
            end={{x: 1, y: 0.5}}
            colors={['transparent', 'rgb(48, 1, 46)']}
            style={{
              height: 160,
              width: '100%',
              justifyContent: 'flex-end',
            }}>
            <View style={styles.itemDateView}>
              <Text style={styles.dateTxt1}>FILME DE </Text>
              <Text style={styles.dateTxt2}>
                {truncateYear(item.release_date, 5)}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.secondContainer}>
          <View style={{width: '100%'}}>
            <Text style={styles.title}>{item.title} </Text>
          </View>
          <Text style={styles.dbText}> {item.media_type} </Text>
          <View style={styles.itemRecords}>
            <View style={styles.recordsBox1}>
              <Text style={styles.dbText}>
                {item.vote_count} <Text style={styles.insideTxt}>curtidas</Text>
              </Text>
              <Text style={styles.dbText}>
                49 <Text style={styles.insideTxt}>comentários</Text>
              </Text>
            </View>

            <View style={styles.recordsBox2}>
              <Text style={styles.votes}>
                {item.vote_average}
                <Text style={styles.insideTxt}>/10</Text>
              </Text>
              <Text style={styles.insideTxt}>Avaliação</Text>
            </View>
          </View>

          <View style={styles.btnsRow}>
            <TouchableOpacity style={styles.Btn}>
              <Image style={styles.btnIcon} source={CommentIcon} />
              <Text style={styles.btnText}>Comentar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Btn}>
              <Image style={styles.btnIcon} source={LaterIcon} />
              <Text style={styles.btnText}>Ver Depois</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={likeItem} style={styles.Btn}>
              <Image
                style={styles.btnIcon}
                source={like ? FilledHeartIcon : HeartIcon}
              />
              <Text style={styles.btnText}>Curtir</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.itemDetails}>
            <Text style={styles.role}>Diretor</Text>
            <Text style={styles.overviewTxt}>Names</Text>
          </View>

          <View style={styles.itemDetails}>
            <Text style={styles.role}>Elenco</Text>
            <Text style={styles.overviewTxt}>Names</Text>
          </View>
          <View style={styles.itemDetails}>
            <Text style={styles.role}>Descrição</Text>
            <Text style={styles.overviewTxt}>{item.overview}</Text>
          </View>
        </View>
 */
