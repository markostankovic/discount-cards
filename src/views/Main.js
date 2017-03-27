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
        <ScrollView style={{ paddingTop: 100}}>
          <Button
            onPress={() => navigate('Register')}
            title="Register New Code"
            color="#b22222"
          />
        </ScrollView>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  validIndicatorWrapper: {
    textAlign: 'center',
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

// AppRegistry.registerComponent('App', () => App);
