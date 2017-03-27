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
      style: {
        backgroundColor: '#222222',
      },
      title: 'Scan Card',
      tintColor: '#e9e9e9',
    }),
  };

  constructor(props) {
    super(props);
    this._listener = null;
  }

  componentDidMount(){
    const { dispatch } = this.props;

    this._listener = DeviceEventEmitter.addListener('NFCTagDetected', (res) => {
      dispatch(fetchCode(res.serial));
    });
  }

  componentWillUnmount() {
    this._listener.remove();
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.cardData && !nextProps.cardData.activated && nextProps.cardData.valid ) {
      dispatch(updateDiscountCard(nextProps.cardData));
    }
  }

  onButtonPress() {
    const { dispatch } = this.props;
    dispatch(fetchCode('804A9E2AAB5204xx')); //valid
    // dispatch(fetchCode('0452ab2a9e4a80')); //invalid
    // Alert.alert('Button has been pressed!');
  }

  render() {
    const { cardData, isFetching } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          { cardData ?
            <Text style={styles.validIndicatorWrapper}>
              { cardData.valid ?
                <Ionicons
                  name='ios-checkmark-circle-outline'
                  size={ 100 }
                  color='#008000' /> :
                cardData.startDate ?
                  <Ionicons
                    name='ios-close-circle-outline'
                    size={ 100 }
                    color='#b22222' /> :
                  <Ionicons
                    name='ios-help-circle-outline'
                    size={ 100 }
                    color='#b22222' />
              }
            </Text> :
            <Text style={styles.validIndicatorWrapper}>
              <Ionicons
                name='ios-qr-scanner'
                size={ 100 }
                color='grey' />
            </Text> }
          <Button
            onPress={ () => this.onButtonPress() }
            title="Simulate Scan"
            color="#b22222"
            accessibilityLabel="Learn more about purple"
          />
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
    backgroundColor: 'whitesmoke'
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
