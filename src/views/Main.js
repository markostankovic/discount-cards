import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  Button,
  DeviceEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class MainView extends Component {
  static navigationOptions = {
    title: 'Welcome',
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      visible: true,
      title: 'Welcome',
      right: (
        <Ionicons
          name='ios-qr-scanner'
          size={ 26 }
          color='#000'
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate('Scan')}
        />
      ),
    }),
  };
  render() {
    return (
      <ScrollView>
        <Text>
          Main View
        </Text>
      </ScrollView>
    );
  }
}

export default MainView;

// AppRegistry.registerComponent('App', () => App);
