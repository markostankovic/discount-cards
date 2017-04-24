import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class LocationCallout extends Component {
  static PropTypes = {
    locationDetailData: PropTypes.object,
  }

  render() {
    const {
      locationDetailData,
      locationDetailData: {
        name,
        address,
        discountAmount,
      },
    } = this.props;

    return (
      <View>
        <Text style={ styles.locationName }>{ name }</Text>
        <Text>{ address }</Text>
        <View style={ styles.bottomCalloutWrapper }>
          <Text style={ styles.discountAmount }>-{ discountAmount }%</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  locationName: {
    fontWeight: 'bold',
    color: '#222',
  },
  bottomCalloutWrapper: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 5,
  },
  discountAmount: {
    color: 'white',
    backgroundColor: '#b22222',
    padding: 3,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 12,
  },
});

module.exports = LocationCallout;
