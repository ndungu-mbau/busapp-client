/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createStackNavigator, DrawerNavigator} from 'react-navigation';

import Login from './component/screen/Login/Login';
import Registration from './component/screen/Registration/Registration';
import Profile from './component/screen/Profile/Profile';
import JourneyDetails from './component/screen/Profile/JourneyDetails';
import SeatPlan from './component/screen/Profile/SeatPlan';
import PassengerDetails from './component/screen/Profile/PassengerDetails';
import PickUp from './component/screen/Profile/PickUp';
import Payment from './component/screen/Profile/Payment';
import ForgetPass from './component/screen/Login/ForgetPass';
import PayPaypal from './component/screen/Payment/PayPaypal';
import PayBank from './component/screen/Payment/PayBank';
import PayCash from './component/screen/Payment/PayCash';
import PayMpesa from './component/screen/Payment/PayMpesa';
import EditProfile from './component/screen/Profile/EditProfile';
import ViewProfile from './component/screen/Profile/ViewProfile';
import SideDrawerPage from './component/screen/Profile/SideDrawerPage';

const myDrawer = DrawerNavigator(
  {
    profile: {
      screen: Profile,
    },
    journeydetails: {
      screen: JourneyDetails,
    },
    seatplan: {
      screen: SeatPlan,
    },
    passenger: {
      screen: PassengerDetails,
    },
    pickUp: {
      screen: PickUp,
    },
    pay: {
      screen: Payment,
    },
    forget: {
      screen: ForgetPass,
    },
    paypaypal: {
      screen: PayPaypal,
    },
    paybank: {
      screen: PayBank,
    },
    paycash: {
      screen: PayCash,
    },
    paympesa: {
      screen: PayMpesa,
    },
    sidedrawer: {
      screen: SideDrawerPage,
    },
    edit: {
      screen: EditProfile,
    },
    viewpro: {
      screen: ViewProfile,
    },
  },
  {
    initialRouteName: 'profile',
    drawerPosition: 'left',
    contentComponent: (props) => <SideDrawerPage {...props} />,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerBackgroundColor: 'transparent',
    navigationOptions: {
      drawerLockMode: 'locked-close',
      disableGestures: true,
    },
  },
);

const myNav = createStackNavigator(
  {
    dash: {
      screen: myDrawer,
    },
    login: {
      screen: Login,
    },
    sidedrawer: {
      screen: SideDrawerPage,
    },
    viewpro: {
      screen: ViewProfile,
    },
    registration: {
      screen: Registration,
    },
    profile: {
      screen: Profile,
    },
    journeydetails: {
      screen: JourneyDetails,
    },
    seatplan: {
      screen: SeatPlan,
    },
    passenger: {
      screen: PassengerDetails,
    },
    pickUp: {
      screen: PickUp,
    },
    pay: {
      screen: Payment,
    },
    forget: {
      screen: ForgetPass,
    },
    paypaypal: {
      screen: PayPaypal,
    },
    paybank: {
      screen: PayBank,
    },
    paycash: {
      screen: PayCash,
    },
    edit: {
      screen: EditProfile,
    },
  },
  {
    initialRouteName: 'login',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default myNav;
