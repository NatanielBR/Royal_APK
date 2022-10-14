import React, { useContext } from 'react';
import { Text, View, Modal, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { BlurView } from '@react-native-community/blur';

import styles from './Style';
import { moreContext } from '../../Context/ContextApi';

import Logo from '../../Assets/Logo/Logo-Royal-Prime_TH1.png';
import CloseIcon from '../../Assets/Icons/close-cross.png';
import ListIcon from '../../Assets/Icons/add-list-outline.png';
import BoltIcon from '../../Assets/Icons/bolt.png';
import NavIcon from '../../Assets/Icons/gol.png';
import FaqIcon from '../../Assets/Icons/FAQ.png';

function MenuContent({ menuIcon, screenName, goTo, isLink }) {
    const navigation = useNavigation();


    const onPressLink = (goTo) => {
        Linking.canOpenURL(goTo).then(supported => {
            if (supported) {
                Linking.openURL(goTo);
            }
        })
    }



    return (
        <TouchableOpacity style={styles.menuBtn} onPress={() => isLink ? onPressLink(goTo) : navigation.navigate(goTo)}>
            <Image source={menuIcon} style={styles.icon2} />
            <View style={styles.screenName}>
                <Text style={styles.txt}> {screenName} </Text>
            </View>
        </TouchableOpacity>
    );
}

const Menu = () => {
    const listOfScreens = [
        {
            Icon: ListIcon,
            Name: 'Listas',
            isLink: false,
            IrPara: 'Lista',
        },
        {
            Icon: FaqIcon,
            Name: 'FAQ',
            isLink: true,
            IrPara: 'https://r0site.herokuapp.com',
        },
        // {
        //     Icon: BoltIcon,
        //     Name: 'Royal Mais Rápido',
        //     IrPara: 'Home',
        // },
        // {
        //     Icon: BoltIcon,
        //     Name: 'ChromeCast',
        //     IrPara: 'Home',
        // },
        {
            Icon: NavIcon,
            Name: 'Visite nosso site',
            isLink: true,
            IrPara: 'https://r0site.herokuapp.com',
        },
    ];

    const { toggleModal, setToggleModal } = useContext(moreContext);

    return (
        <Modal transparent visible={toggleModal} style={styles.modal}>
            <BlurView
                style={styles.blur}
                blurType="dark"
                blurAmount={1}
                reducedTransparencyFallbackColor="white"
            />
            <Animatable.View
                style={styles.container}
                animation="slideInDown"
                iterationCount={1}>
                <View style={styles.header}>
                    <View>
                        <Image style={styles.logo} source={Logo} />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setToggleModal(false);
                        }}
                        style={styles.closeModalBtn}>
                        <Image source={CloseIcon} style={styles.icon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.screensList}>
                    {listOfScreens.map((item, index) => {
                        return (
                            <MenuContent
                                key={index}
                                menuIcon={item.Icon}
                                goTo={item.IrPara}
                                isLink={item.isLink}
                                screenName={item.Name}
                            />
                        );
                    })}
                </View>
            </Animatable.View>
        </Modal>
    );
};

export default Menu;
