import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const window = Dimensions.get('window');

class BottomNavbar extends Component {
  static PropTypes = {
    navigator: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
  }

  render() {
    const { navigator, routes } = this.props;

    return (
      <View style={ styles.bottomNavbar }>
        <TouchableHighlight
          style={ styles.navbarButton }
          onPress={() => { navigator.jumpTo(routes[0]) }}>
          <View style={ styles.navbarButtonInner }>
            <Ionicons
              name='ios-home'
              size={ 26 }
              color='#e9e9e9' />
            <Text style={ styles.navbarText }>Home</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={ styles.navbarButton }
          onPress={() => { navigator.jumpTo(routes[1]) }}>
          <View style={ styles.navbarButtonInner }>
            <Ionicons
              name='ios-pin'
              size={ 26 }
              color='#e9e9e9' />
            <Text style={ styles.navbarText }>Locations</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={ styles.navbarButton }
          onPress={() => { navigator.jumpTo(routes[2]) }}>
          <View style={ styles.navbarButtonInner }>
            <Ionicons
              name='ios-qr-scanner'
              size={ 26 }
              color='#e9e9e9' />
            <Text style={ styles.navbarText }>Scan</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={ styles.navbarButton }
          onPress={() => { navigator.jumpTo(routes[4]) }}>
          <View style={ styles.navbarButtonInner }>
            <Ionicons
              name='ios-help-buoy'
              size={ 26 }
              color='#e9e9e9' />
            <Text style={ styles.navbarText }>Help</Text>
          </View>
        </TouchableHighlight>
        {/*<TouchableHighlight*/}
          {/*style={ styles.navbarButton }*/}
          {/*onPress={() => { navigator.jumpTo(routes[0]) }}>*/}
          {/*<View style={ styles.navbarButtonInner }>*/}
            {/*<Ionicons*/}
              {/*name='ios-help-buoy'*/}
              {/*size={ 26 }*/}
              {/*color='#e9e9e9' />*/}
            {/*<Text style={ styles.navbarText }>Help</Text>*/}
          {/*</View>*/}
        {/*</TouchableHighlight>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomNavbar: {
    alignItems: 'stretch',
    justifyContent: 'center',
    height: 50,
    position: 'absolute',
    left: 0,
    bottom: 0,
    flex: 1,
    width: window.width,
    backgroundColor: '#222222',
    zIndex: 1,
    flexDirection: 'row',
  },
  navbarButton: {
    width: window.width / 4,
    height: 50
  },
  navbarButtonInner: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbarText: {
    color: '#e9e9e9',
    fontSize: 12
  }
});

export default BottomNavbar;
