import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import MainView from '../views/Main';
import LocationsView from '../views/Locations';
import ScanView from '../views/Scan';
import RegisterView from '../views/Register';
import HelpView from '../views/Help';
import BottomNavbar from '../components/global/bottom-navbar';

const routes = [
  {
    index: 0,
    view: MainView
  },
  {
    index: 1,
    view: LocationsView
  },
  {
    index: 2,
    view: ScanView
  },
  {
    index: 3,
    view: RegisterView
  },
  {
    index: 4,
    view: HelpView
  },
];

class SceneComponent extends Component {
  static propTypes = {
    view: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
  }

  render() {
    const SceneView = this.props.view;
    const {navigator, routes} = this.props;

    return (
      <View style={ styles.wrapper }>
        <SceneView navigator={ navigator } routes={ routes } />
        <BottomNavbar navigator={ navigator } routes={ routes } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke'
  },
});

export default class MyNavigator extends Component {
  render() {
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) =>
          <SceneComponent key={ route.index } view={ route.view } navigator={ navigator } routes={ routes } />
        }
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.FadeAndroid}
      />
    );
  }
}