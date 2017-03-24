import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  Button,
  DeviceEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
// var NfcReadModule = NativeModules.NfcReadModule;

import Posts from '../components/Posts';

import { fetchCode } from '../actions/discount-cards-actions';

class ScanView extends Component {
  static propTypes = {
    cardData: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  static navigationOptions = {
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      visible: true,
    }),
  };

  constructor(props) {
    super(props);
    this.state = { cardID: null };
  }

  componentDidMount(){
    DeviceEventEmitter.addListener('NFCTagDetected', (res) => {
      console.log('DeviceEventEmitter listened.');
      console.log(res);
      this.setState({ cardID: res.serial });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cardData && nextProps.cardData.activated !== 'true') {

    }
  }

  onButtonPress() {
    const { dispatch } = this.props;
    dispatch(fetchCode('04100f2a9e4a81')); //valid
    // dispatch(fetchCode('0452ab2a9e4a80')); //invalid
    // Alert.alert('Button has been pressed!');
  }

  render() {
    const { cardData, isFetching, lastUpdated } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Scan Card
        </Text>
        <Text style={styles.instructions}>
          Card Id: { this.state.cardID }
        </Text>
        <Button
          onPress={ () => this.onButtonPress() }
          title="Press Purple"
          color="#841584"
          accessibilityLabel="Learn more about purple"
        />
        { !cardData ?
          (isFetching ? <Text>Loading...</Text> : <Text>Empty.</Text>) :
            <View style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Text style={styles.instructions}>
                Card Id: { cardData.discountCode }
                serial Number: { cardData.serialNumber }
              </Text>
            </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});

const mapStateToProps = state => {
  const { discountCards } = state
  const {
    isFetching,
    lastUpdated,
    cardData
  } = discountCards.codeData || {
    isFetching: false,
    cardData: null
  }

  return {
    cardData,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(ScanView);
