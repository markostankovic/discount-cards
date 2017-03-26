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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchCode, updateDiscountCard } from '../actions/discount-cards-actions';
import Loading from '../components/Global/Loading';

class ScanView extends Component {
  static propTypes = {
    cardData: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
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
    this._listener = null;
  }

  componentDidMount(){
    const { dispatch } = this.props;

    this._listener = DeviceEventEmitter.addListener('NFCTagDetected', (res) => {
      console.log('DeviceEventEmitter listened.');
      console.log(res);
      dispatch(fetchCode(res.serial));
      this.setState({ cardID: res.serial });
    });
  }

  componentWillUnmount() {
    this._listener.remove();
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.cardData && !nextProps.cardData.activated) {
      console.log('---update card---');
      dispatch(updateDiscountCard(nextProps.cardData));
    }
  }

  onButtonPress() {
    const { dispatch } = this.props;
    dispatch(fetchCode('804A9E2AAB5204')); //valid
    // dispatch(fetchCode('0452ab2a9e4a80')); //invalid
    // Alert.alert('Button has been pressed!');
  }

  render() {
    const { cardData, isFetching } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
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
          { cardData ?
            <View style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Text style={styles.instructions}>
                serial Number: { cardData.serialNumber }
              </Text>
              <Text style={styles.instructions}>
                activated: { cardData.activated ? 1 : 0 }
              </Text>
              <Text style={styles.instructions}>
                valid: { cardData.valid ? 1 : 0 }
              </Text>
              <Text style={styles.validIndicatorWrapper}>
                { cardData.valid ?
                  <Ionicons
                    name='ios-checkmark-circle-outline'
                    size={ 100 }
                    color='#008000'
                    // style={{ marginRight: 15 }}
                  /> :
                  <Ionicons
                    name='ios-close-circle-outline'
                    size={ 100 }
                    color='#b22222'
                    // style={{ marginRight: 15 }}
                  /> }
              </Text>
            </View> : null }
        </View>
        { isFetching ? <Loading /> : null }
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
  validIndicatorWrapper: {
    textAlign: 'center',
  },
  contentWrapper: {
    zIndex: 0,
    flex: 1
  }
});

const mapStateToProps = state => {
  const { discountCards } = state
  const {
    isFetching,
    cardData
  } = discountCards.codeData || {
    isFetching: false,
    cardData: null
  }

  return {
    cardData,
    isFetching
  }
}

export default connect(mapStateToProps)(ScanView);
