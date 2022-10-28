import React, { useState } from "react";
import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { moreContext } from "../Context/ContextApi";

import Color from "../Assets/ColorPallet";
import Search from "../Assets/Icons/search.png";
import Plus from "../Assets/Icons/plus.png";
import Logo from "../Assets/Logo/Logo-Royal-Prime_TH1.png";
import MenuIcon from "../Assets/Icons/list.png";
import Bell from "../Assets/Icons/bell.png";
import Menu from "../Screen/Menu/Menu";
import Filter from "../Screen/Filter/Filter";
import SearchScreen from "../Screen/Search/Search";
import Notification from "../Screen/Notification/Not";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HeadButtons(props) {
  const navigation = useNavigation();
  const goHome = () => {
    navigation.navigate("Home");
  };
  return (
    <TouchableOpacity style={styles.btnBody} onPress={props.M || goHome}>
      <Image style={{ ...styles.icons, ...props.style }} source={props.Icon} />
    </TouchableOpacity>
  );
}

const Header = (instance) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [filter, setFilter] = useState(false);
  const [search, setSearch] = useState(false);
  const [notification, setNotification] = useState(false);

  const toggle = () => {
    setToggleModal(true);
  };

  const toggleFil = () => {
    setFilter(true);
  };

  const toggleSearch = () => {
    setSearch(true);
  };

  const addItemSave = () => {
    (async () => {
      // console.log(instance.actualItem);
      try {
        // instance.actualItem.Imdbid
        let myList = await AsyncStorage.getItem("myList");
        if (myList === null) {
          myList = {};
        } else {
          myList = JSON.parse(myList);
        }

        instance.actualItem.typeItem = instance.typeItem

        myList[instance.actualItem.Imdbid] = instance.actualItem;

        await AsyncStorage.setItem(
          "myList",
          JSON.stringify(myList),
        );
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const toggleNotification = () => {
    setNotification(true);
  };

  return (
    <View style={styles.body}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={"transparent"}
      />
      <moreContext.Provider
        value={{
          toggleModal,
          setToggleModal,
          filter,
          setFilter,
          search,
          setSearch,
          notification,
          setNotification,
        }}>
        <HeadButtons
          modal={true}
          M={toggle}
          Icon={MenuIcon}
          style={{ marginLeft: 12 }}
        />

        <HeadButtons
          Icon={Logo}
          style={{
            width: 80,
            height: 50,
            alignSelf: "center",
            marginLeft: 12,
          }}
        />

        <View style={styles.headerBtns}>
          <HeadButtons M={addItemSave} Icon={Plus} />
          <HeadButtons M={toggleSearch} Icon={Search} />
          <HeadButtons M={toggleNotification} Icon={Bell} />
        </View>
        <Menu />
        <Filter />
        <SearchScreen />
        <Notification />
      </moreContext.Provider>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  body: {
    width: "100%",
    height: 80,
    backgroundColor: Color.bGColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerBtns: {
    height: "100%",
    width: "30%",
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnBody: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    width: 18,
    height: 18,
    tintColor: "white",
  },
});
