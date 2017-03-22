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
    navigator: PropTypes.object,
  }

  render() {
    const { leftButtonText, navigator } = this.props;

    return (
      <View style={ styles.headerContainer }>
        { leftButtonText ?
          <TouchableHighlight onPress={() => { navigator.pop() }} >
            <View style={ styles.headerLeftButton }>
              <Icon
                name='arrow-back'
                size={ 20 }
                color='#fff'
                style={ styles.headerLogo } />
              <Text style={styles.textStyle}>{ leftButtonText }</Text>
            </View>
          </TouchableHighlight> :
          <TouchableHighlight>
            <View style={ styles.headerLeftButton }>
              <Icon
                name='layers'
                size={ 20 }
                color='#fff'
                style={ styles.headerLogo } />
              <Text style={styles.textStyle}>Flashcards</Text>
            </View>
          </TouchableHighlight> }
        <TouchableHighlight>
          <Ionicons
            name='ios-qr-scanner'
            size={ 25 }
            color='#fff' />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    backgroundColor: '#222222',
    height: 40,
    alignItems: 'center'
  },
  headerLeftButton: {
    flexDirection: 'row',
  },
  headerLogo: {
    marginRight: 10,
  },
  textStyle: {
    color: 'white'
  }
});

module.exports = Header;
