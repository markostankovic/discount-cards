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
import { registerNewDiscountCard } from '../actions/discount-cards-actions';
import Loading from '../components/Global/Loading';

class RegisterView extends Component {
  static propTypes = {
    newCard: PropTypes.object,
    isRegistering: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static navigationOptions = {
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      visible: true,
      title: 'Register New Discount Card',
      style: {
        backgroundColor: '#222222',
      },
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
      dispatch(registerNewDiscountCard(res.serial));
    });
  }

  componentWillUnmount() {
    this._listener.remove();
  }

  onButtonPress() {
    const { dispatch } = this.props;
    dispatch(registerNewDiscountCard('123'));
  }

  render() {
    const { newCard, isRegistering } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <Text style={styles.indicatorWrapper}>
            { !newCard ?
              <Ionicons
                name='ios-cloud-upload-outline'
                size={ 100 }
                color='#808080' /> :
              <Ionicons
                name='ios-cloud-upload'
                size={ 100 }
                color='#008000' /> }
          </Text>
          <Button
            onPress={ () => this.onButtonPress() }
            title="Simulate Register"
            color="#b22222"
            accessibilityLabel="Learn more about purple" />
        </View>
        { isRegistering ? <Loading /> : null }
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
  indicatorWrapper: {
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
    isRegistering,
    newCard
  } = discountCards.newCard || {
    isRegistering: false,
    newCard: null
  }

  return {
    newCard,
    isRegistering
  }
}

export default connect(mapStateToProps)(RegisterView);
