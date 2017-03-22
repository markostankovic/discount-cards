import React, { PropTypes } from 'react';
import {
  AppRegistry,
  Button,
  DeviceEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
  View
} from 'react-native';

const Posts = ({posts}) => (
  <View style={styles.container}>
    {posts.map((post, i) =>
      <Text key={i}>{post.title}</Text>
    )}
  </View>
)

Posts.propTypes = {
  posts: PropTypes.array.isRequired
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

export default Posts
