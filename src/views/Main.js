import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  Button,
  DeviceEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class MainView extends Component {
  static navigationOptions = {
    title: 'Welcome',
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      visible: true,
      title: 'Welcome',
      style: {
        backgroundColor: '#222222',
      },
      tintColor: '#e9e9e9',
      right: (
        <TouchableHighlight style={{ padding: 15 }} onPress={() => navigation.navigate('Scan')}>
          <Ionicons
            name='ios-qr-scanner'
            size={ 26 }
            color='#e9e9e9'
          />
        </TouchableHighlight>
      ),
    }),
  };
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='#2d2d2d'
          barStyle='light-content' />
        <View style={styles.buttonsWrapper}>
          <Button
            style={styles.buttonStyle}
            onPress={() => navigate('Register')}
            title="Register New Code"
            color="#b22222" />
        </View>
        <View style={styles.buttonsWrapper}>
          <Button
            style={styles.buttonStyle}
            onPress={() => navigate('Locations')}
            title="Locations"
            color="#b22222" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke'
  },
  buttonsWrapper: {
    marginBottom: 20
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  validIndicatorWrapper: {
    textAlign: 'center',
  },
  buttonStyle: {
    marginBottom: 50,
  },
  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: window.height - 80,
    position: 'absolute',
    left: 0,
    top: 0,
    flex: 1,
    zIndex: 1,
    width: window.width,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
});

export default MainView;
