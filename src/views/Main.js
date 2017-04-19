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
          headerTitle='Easy Pass'
          navigator={ navigator }
          routes={ routes }
          rightButton={{
            icon: 'ios-cloud-upload-outline',
            text: '',
            handleButtonClick: () => { navigator.jumpTo(routes[3]) }
          }} />
        <View style={styles.contentWrapper}>
          <Image source={ require('../images/traveler.jpg') } style={styles.backgroundImage}>
            <View style={ styles.imageContent }>
              <View style={ styles.textWrapper }>
                <Text style={ styles.contentText }>You don’t have to be rich to travel well.</Text>
                <Text style={ styles.contentSmallText }></Text>
                <Ionicons
                  name='ios-happy-outline'
                  size={ 80 }
                  color='#cdcdcd' />
              </View>
              { this.renderMainMenu() }
            </View>
          </Image>
        </View>
      </View>
    );
  }

  renderMainMenu() {
    const { navigator, routes } = this.props;

    return (
      <View style={ styles.mainMenuWrapper }>
        <TouchableHighlight
          style={ [styles.mainMenuButton, { borderColor: 'chocolate', }] }
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
          style={ [styles.mainMenuButton, { borderColor: 'goldenrod', }] }
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
          style={ [styles.mainMenuButton, { borderColor: 'cadetblue', }] }
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
    alignItems: 'stretch',
    // backgroundColor: '#b22222'
  },
  contentWrapper: {
    flex: 1,
    height: (window.height) - 50,
  },
  mainMenuWrapper: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    maxHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: window.width,
  },
  mainMenuButton: {
    // flexBasis: (window.width / 3) - 20,
    // width: (window.width / 3) - 20,
    flexBasis: 100,
    width: 100,
    height: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 0,
    borderWidth: 2,
    borderColor: '#b22222',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    margin: 10,
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    height: window.height,
    width: window.width,
  },
  imageContent: {
    flex: 1,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  contentText: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    padding: 20,
    opacity: 0.9,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
  },
  contentSmallText: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    padding: 20,
    opacity: 0.9,
    borderTopWidth: 1,
    borderColor: '#fff',
    width: (window.width / 2),
  }
});

export default MainView;
