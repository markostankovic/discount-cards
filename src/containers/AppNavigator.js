import React from 'react';
import {
  AppRegistry,
  Platform,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import MainView from '../views/Main';
import ScanView from '../views/Scan';
import TestView from '../views/Test';
import RegisterView from '../views/Register';
import LocationsView from '../views/Locations';

const AppNavigator = StackNavigator({
  Index: { screen: MainView },
  Scan: { screen: ScanView },
  Test: { screen: TestView },
  Register: { screen: RegisterView },
  Locations: { screen: LocationsView },
}, {
  initialRouteName: 'Index',

  /*
   * Use modal on iOS because the card mode comes from the right,
   * which conflicts with the drawer example gesture
   */
  mode: Platform.OS === 'ios' ? 'modal' : 'card',
});

export default () => <AppNavigator />;

// AppRegistry.registerComponent('App', () => App);