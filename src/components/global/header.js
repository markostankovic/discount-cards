import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Header extends Component {
  static PropTypes = {
    leftButtonText: PropTypes.string,
    headerTitle: PropTypes.string,
    navigator: PropTypes.object,
    routes: PropTypes.array,
    rightButton: PropTypes.object,
    leftIcon: PropTypes.object,
  }

  render() {
    const {
      leftButtonText,
      navigator,
      leftIcon,
      headerTitle,
      rightButton
    } = this.props;

    return (
      <View style={ styles.headerContainer }>
        { leftButtonText ?
          <TouchableHighlight onPress={() => { navigator.pop() }} >
            <View style={ styles.headerLeftButton }>
              <Icon
                name='arrow-back'
                size={ 20 }
                color='#e9e9e9'
                style={ styles.headerLogo } />
              <Text style={styles.textStyle}>{ leftButtonText }</Text>
            </View>
          </TouchableHighlight> :
          <TouchableHighlight>
            <View style={ styles.headerLeftButton }>
              { leftIcon ?
                <Ionicons
                  name={ leftIcon.icon }
                  size={ 20 }
                  color={ leftIcon.color ? leftIcon.color : '#b22222' }
                  style={ styles.headerLogo } /> :
                <Ionicons
                  name='ios-pricetags'
                  size={ 20 }
                  color='#b22222'
                  style={ styles.headerLogo } /> }
              <Text style={styles.textStyle}>{ headerTitle }</Text>
            </View>
          </TouchableHighlight> }
        { rightButton ?
          <TouchableHighlight style={ styles.sideButtonWrapper } onPress={ rightButton.handleButtonClick }>
            <View style={ styles.sideButton }>
              <Ionicons
                name={ rightButton.icon }
                size={ 25 }
                color='#e9e9e9' />
            </View>
          </TouchableHighlight> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    justifyContent: 'space-between',
    backgroundColor: '#222222',
    height: 50,
    alignItems: 'center'
  },
  headerLeftButton: {
    flexDirection: 'row',
  },
  headerLogo: {
    marginRight: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: 16
  },
  sideButtonWrapper: {
    padding: 15,
  },
  sideButton: {
    // color: 'white'
  }
});

module.exports = Header;
