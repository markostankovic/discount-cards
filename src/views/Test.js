import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';
import {
  AppRegistry,
  Button,
  DeviceEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
var NfcReadModule = NativeModules.NfcReadModule;

class App extends Component {
  static propTypes = {
    selectedReddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = { cardID: null };
    console.log('Constructed.')
  }

  componentDidMount(){
    console.log("componentDidMount.");

    const { dispatch, selectedReddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedReddit))

    DeviceEventEmitter.addListener('NFCTagDetected', (res) => {
      console.log('DeviceEventEmitter listened.');
      console.log(res);
      this.setState({ cardID: res.serial });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }
  }

  handleChange = nextReddit => {
    this.props.dispatch(selectReddit(nextReddit))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedReddit } = this.props
    dispatch(invalidateReddit(selectedReddit))
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  render() {
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props;
    const isEmpty = posts.length === 0;

    return (
      <ScrollView style={styles.container}>
        <Header />
        <View>
          {lastUpdated &&
          <Text>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
            {' '}
            </Text>
          }
          {!isFetching &&
          <Text>
            Refresh
          </Text>
          }
        </View>
        <Text style={styles.welcome}>
          Welcome to React Native! 2
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <Text style={styles.instructions}>
          Card Id: { this.state.cardID }
        </Text>
        { isEmpty
          ? (isFetching ? <Text>Loading...</Text> : <Text>Empty.</Text>)
          : <View style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
        </View>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  const { selectedReddit, postsByReddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)

// AppRegistry.registerComponent('App', () => App);
