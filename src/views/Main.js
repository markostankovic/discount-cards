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
  Image,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomNavbar from '../components/global/bottom-navbar';
import Header from '../components/global/header';

const window = Dimensions.get('window');

class MainView extends Component {
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
          headerTitle='Easy Card Discount'
          navigator={ navigator }
          routes={ routes }
          rightButton={{
            icon: 'ios-cloud-upload-outline',
            text: '',
            handleButtonClick: () => { navigator.jumpTo(routes[3]) }
          }} />
        { this.renderMainMenu() }
      </View>
    );
  }

  renderMainMenu() {
    const { navigator, routes } = this.props;

    return (
      <View style={ styles.mainMenuWrapper }>
        <TouchableHighlight
          style={ [styles.mainMenuButton, { backgroundColor: 'cadetblue' }] }
          onPress={() => { navigator.jumpTo(routes[1]) }}>
          <View style={ styles.mainMenuButtonInner }>
            <Ionicons
              name='ios-pin'
              size={ 26 }
              color='#e9e9e9' />
            <Text style={ styles.mainMenuButtonText }>Locations</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={ [styles.mainMenuButton, { backgroundColor: 'chocolate' }] }
          onPress={() => { navigator.jumpTo(routes[2]) }}>
          <View style={ styles.mainMenuButtonInner }>
            <Ionicons
              name='ios-qr-scanner'
              size={ 26 }
              color='#e9e9e9' />
            <Text style={ styles.mainMenuButtonText }>Scan</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={ [styles.mainMenuButton, { backgroundColor: 'goldenrod' }] }
          onPress={() => { navigator.jumpTo(routes[4]) }}>
          <View style={ styles.mainMenuButtonInner }>
            <Ionicons
              name='ios-help-buoy'
              size={ 26 }
              color='#e9e9e9' />
            <Text style={ styles.mainMenuButtonText }>Help</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: 50,
    // backgroundColor: '#b22222'
  },
  mainMenuWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mainMenuButton: {
    margin: 0.5,
    flexBasis: (window.width / 3) - 1,
    width: (window.width / 3) - 1,
    height: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 0,
    backgroundColor: '#b22222',
  },
  mainMenuButtonInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainMenuButtonText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10
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

export default MainView;
