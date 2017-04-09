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
import Header from '../components/global/header';

class HelpView extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
  }

  render() {
    const { navigator, routes } = this.props;

    return (
      <View style={styles.wrapper}>
        <StatusBar
          backgroundColor='#2d2d2d'
          barStyle='light-content' />
        <Header
          headerTitle='Help'
          navigator={ navigator }
          routes={ routes } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: 50,
  },
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

export default HelpView;
