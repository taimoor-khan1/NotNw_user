import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';

import {LoaderModal} from '../components';
import Firebase from '../utils/firebaseConfig';
import DrawerNavigation from './DrawerNavigation';
import {CONSTANTS, SCREENS} from '../constants';
import {
  Login,
  SignUp,
  Splash,
  Verification,
  ResetPassword,
  ForgotPassword,
} from '../screens/auth';
import {
  profile,
  getBrands,
  categories,
  ProductList,
  getBanners,
  getContent,
  getAddress,
  saveAccessToken,
  getFavoriteProducts,
  getCards,
  getAllOrders,
} from '../redux/slices';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

export default function MainNavigation() {
  const dispatcher = useDispatch();
  const token = useSelector(state => state.auth.accessToken);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // getServerUrl();
    getUserAccessToken();
  }, [token]);

  const getServerUrl = async () => {
    await Firebase();
    try {
      await database()
        .ref(CONSTANTS.FIREBASE.UTILS)
        .child('server_url')
        .on('value', dataSnapshot => {
          console.log('dataSnapshot: ', dataSnapshot.val());
          // dispatcher(saveServerUrls(dataSnapshot.val()));
        });
    } catch (error) {
      console.log('getting server url error: ', error);
    }
  };

  const getUserAccessToken = async () => {
    if (token !== null && token !== undefined) {
      await dispatcher(saveAccessToken(token));
      getUserProfile();
    } else {
      setTimeout(() => {
        setAppLoading(false);
      }, 2000);
    }
  };

  const getUserProfile = async () => {
    dispatcher(profile(''))
      .unwrap()
      .then(response => {
        // console.log('getProfile response: ', response);

        dispatcher(categories(''));
        dispatcher(getBrands(''));
        dispatcher(ProductList(''));
        dispatcher(getBanners(''));
        dispatcher(getContent(''));
        dispatcher(getAddress(''));
        dispatcher(getCards(''));
        dispatcher(getAllOrders(''));
        dispatcher(getFavoriteProducts(''));
        setAppLoading(false);
      })
      .catch(error => {
        setAppLoading(false);
        console.log('getProfile error: ', error);
      });
  };

  return (
    <>
      {appLoading ? (
        <LoaderModal visible={appLoading} />
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={screenOptions}
            initialRouteName={SCREENS.Splash}>
            {token !== null && token !== undefined ? (
              <Stack.Screen
                name={SCREENS.DrawerNavigation}
                component={DrawerNavigation}
              />
            ) : (
              <>
                <Stack.Screen name={SCREENS.Splash} component={Splash} />
                <Stack.Screen name={SCREENS.Login} component={Login} />
                <Stack.Screen name={SCREENS.SignUp} component={SignUp} />
                <Stack.Screen
                  name={SCREENS.ForgotPassword}
                  component={ForgotPassword}
                />
                <Stack.Screen
                  name={SCREENS.Verification}
                  component={Verification}
                />
                <Stack.Screen
                  name={SCREENS.ResetPassword}
                  component={ResetPassword}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
