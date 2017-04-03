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
  Picker,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { registerNewDiscountCard } from '../actions/discount-cards-actions';
import { fetchAllDistributors } from '../actions/distributors-actions';
import Loading from '../components/Global/Loading';

class RegisterView extends Component {
  static propTypes = {
    newCard: PropTypes.object,
    isRegistering: PropTypes.bool.isRequired,
    isFetchingDistributors: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    distributorsData: PropTypes.array,
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
    this.state = { selectedDistributor: null };
  }

  componentDidMount(){
    const { dispatch } = this.props;

    dispatch(fetchAllDistributors());

    this._listener = DeviceEventEmitter.addListener('NFCTagDetected', (res) => {
      this.registerNewDiscountCardHandler(res.serial);
    });
  }

  componentWillUnmount() {
    this._listener.remove();
  }

  onButtonPress() {
    this.registerNewDiscountCardHandler('1231234');
  }

  render() {
    const { newCard, isRegistering, distributorsData } = this.props;

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
          <View style={styles.pickerWrapper}>
            <Picker
              style={styles.distributorPicker}
              selectedValue={this.state.selectedDistributor}
              onValueChange={(distributorId) => this.setState({selectedDistributor: distributorId})}>
              <Picker.Item key={ 0 } label='Select Distributor' value={ null } />
              { distributorsData ? distributorsData.map((distributor, index) => {
                return (
                  <Picker.Item key={ index + 1 } label={ distributor.name } value={ distributor.distributorId } />
                );
              }) : null }
            </Picker>
          </View>
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

  registerNewDiscountCardHandler(serial) {
    const { dispatch } = this.props;
    const { selectedDistributor } = this.state;

    dispatch(registerNewDiscountCard(serial, selectedDistributor));
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
  distributorPicker: {
    width: 200,
  },
  pickerWrapper: {
    width: 200,
    borderBottomColor: '#808080',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    marginBottom: 20,
  },
  contentWrapper: {
    zIndex: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = state => {
  const { discountCards, distributors } = state;
  const {
    isRegistering,
    newCard
  } = discountCards.newCard || {
    isRegistering: false,
    newCard: null
  };
  const {
    isFetchingDistributors,
    distributorsData
  } = distributors.distributorsData || {
    isFetchingDistributors: false,
    distributorsData: []
  };

  return {
    newCard,
    isRegistering,
    isFetchingDistributors,
    distributorsData,
  }
}

export default connect(mapStateToProps)(RegisterView);
