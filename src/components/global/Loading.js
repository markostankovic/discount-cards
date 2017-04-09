import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

const window = Dimensions.get('window');

class Loading extends Component {
  static PropTypes = {
    loadingText: PropTypes.string,
  }

  render() {
    const { loadingText } = this.props;

    return (
      <View style={ styles.loadingContainer }>
        <ActivityIndicator
          style={ styles.loadingSpinner }
          size='large'
          color='#ffffff' />
        { loadingText ? <Text style={ styles.loadingText }>{ loadingText }</Text> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: window.height - 80,
    position: 'absolute',
    left: 0,
    top: 0,
    flex: 1,
    width: window.width,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  loadingText: {
    color: 'white',
    textAlign: 'center',
  },
  loadingSpinner: {
    marginBottom: 10
  }
});

export default Loading;
