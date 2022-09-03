import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from '../screens/home';
import {MyOrders} from '../screens/order';
import {Profile} from '../screens/profile';
import {CustomDrawer} from '../components';
import {Checkout} from '../screens/checkout';
import {Settings} from '../screens/settings';
import {COLORS, SCREENS} from '../constants';
import {SearchScreen} from '../screens/search';
import {Noitification} from '../screens/noitification';
import {AboutUs, TermsAndConditions} from '../screens/content';
import {AddCard, PaymentMethod} from '../screens/paymentMethod';
import {
  ShippingAddress,
  AddShippingAddress,
  EditShippingAddress,
} from '../screens/address';
import {
  Brands,
  Products,
  Categories,
  ProductDetail,
  FavoriteProducts,
  ProductsByType,
} from '../screens/product';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const stackScreenOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

const screenOptions = {
  headerShown: false,
  drawerStyle: {
    backgroundColor: COLORS.transparent,
  },
};

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      initialRouteName={SCREENS.Home}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name={SCREENS.DrawerNavigator} component={_Stack} />
    </Drawer.Navigator>
  );
}

function _Stack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name={SCREENS.Home} component={Home} />
      <Stack.Screen name={SCREENS.AboutUs} component={AboutUs} />
      <Stack.Screen name={SCREENS.Settings} component={Settings} />
      <Stack.Screen
        name={SCREENS.TermsAndConditions}
        component={TermsAndConditions}
      />
      <Stack.Screen name={SCREENS.Profile} component={Profile} />
      <Stack.Screen name={SCREENS.Noitification} component={Noitification} />
      <Stack.Screen name={SCREENS.SearchScreen} component={SearchScreen} />
      <Stack.Screen name={SCREENS.ProductDetail} component={ProductDetail} />
      <Stack.Screen
        name={SCREENS.ShippingAddress}
        component={ShippingAddress}
      />
      <Stack.Screen
        name={SCREENS.EditShippingAddress}
        component={EditShippingAddress}
      />
      <Stack.Screen
        name={SCREENS.AddShippingAddress}
        component={AddShippingAddress}
      />
      <Stack.Screen name={SCREENS.Products} component={Products} />
      <Stack.Screen
        name={SCREENS.FavoriteProducts}
        component={FavoriteProducts}
      />
      <Stack.Screen name={SCREENS.Categories} component={Categories} />
      <Stack.Screen name={SCREENS.Brands} component={Brands} />
      <Stack.Screen name={SCREENS.PaymentMethod} component={PaymentMethod} />
      <Stack.Screen name={SCREENS.AddCard} component={AddCard} />
      <Stack.Screen name={SCREENS.Checkout} component={Checkout} />
      <Stack.Screen name={SCREENS.ProductsByType} component={ProductsByType} />
      <Stack.Screen name={SCREENS.MyOrders} component={MyOrders} />
    </Stack.Navigator>
  );
}
