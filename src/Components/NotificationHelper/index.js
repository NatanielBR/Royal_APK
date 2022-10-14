import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getNotficationToken();
  }
}

export async function getNotficationToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('Old Token ' + fcmToken);

  try {
    if (!fcmToken) {
      let fcmToken = await messaging().getToken();
      console.log('New Token');
      console.log(fcmToken);

      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
        console.log('New Token' + fcmToken);
      }
    }
  } catch (e) {
    console.log(`ERROR ${e.message}`);
  }
}


export const NotificationServices = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    navigation.navigate(remoteMessage.data.type);
  });

  messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );

      }
    });
}
// export const NotificationListener = () => {
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//   });

//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//         //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
//       }
//       //setLoading(false);
//     });

//   messaging().onMessage(async remoteMessage => {
//     console.log('Notification foreground ....... ', remoteMessage);
//   });
// };
