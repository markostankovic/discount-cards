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
    posts: PropTypes.array.isRequired,
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

  onButtonPress() {
    const { dispatch } = this.props;
    dispatch(fetchCode('react-native'))
    Alert.alert('Button has been pressed!');
  }

  render() {
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props;
    const isEmpty = posts.length === 0;

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
        { isEmpty ?
          (isFetching ? <Text>Loading...</Text> : <Text>Empty.</Text>) :
            <View style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
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
    items: posts
  } = discountCards.codeData || {
    isFetching: true,
    items: []
  }

  return {
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(ScanView);
