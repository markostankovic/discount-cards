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
import Loading from '../components/global/Loading';
import BottomNavbar from '../components/global/bottom-navbar';
import Header from '../components/global/header';

class ScanView extends Component {
  static propTypes = {
    cardData: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
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
    this._listener = DeviceEventEmitter.addListener('NFCTagDetected', (res) => {
      this.getDiscountCard(res.serial);
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
    this.getDiscountCard('814A9E2AE54B04');
  }

  render() {
    const { cardData, isFetching, navigator, routes } = this.props;

    return (
      <View style={styles.wrapper}>
        <Header headerTitle='Scan' />
        <View style={styles.container}>
          <View style={styles.contentWrapper}>
            { this.renderCardState(cardData ? cardData : null) }
            {/*<Button*/}
              {/*onPress={ () => this.onButtonPress() }*/}
              {/*title="Simulate Scan"*/}
              {/*color="#b22222"*/}
              {/*accessibilityLabel="Learn more about purple"*/}
            {/*/>*/}
          </View>
          { isFetching ? <Loading /> : null }
        </View>
      </View>
    );
  }

  renderCardState(cardData) {
    const iconName =
      cardData ?
        cardData.valid ?
          'ios-checkmark-circle-outline' :
        cardData.startDate ?
          'ios-close-circle-outline' :
          'ios-help-circle-outline' :
        'ios-qr-scanner';
    const iconColor =
      cardData ?
        cardData.valid ? '#008000' :
          '#b22222' :
        'grey';
    const cardResponseText =
      cardData ?
        cardData.valid ?
          `Valid until ${ cardData.endDate.format('DD. MMM YYYY HH:ss') }` :
          cardData.startDate ?
            `Valid until ${ cardData.endDate.format('DD. MMM YYYY HH:ss') }` :
            'Unknown Card' :
        'Approach Discount Card';

    return (
      <View style={styles.cardState}>
        <Ionicons
          name={ iconName }
          size={ 100 }
          color={ iconColor } />
        <Text style={ styles.indicatorText }>
          { cardResponseText }
        </Text>
      </View>
    );
  }

  getDiscountCard(serial) {
    const { dispatch, isFetching } = this.props;

    if (!isFetching) {
      dispatch(fetchCode(serial));
    }
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: 50,
  },
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
  indicatorText: {
    textAlign: 'center',
  },
  cardState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
