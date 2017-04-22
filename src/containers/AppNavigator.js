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
    index: PropTypes.number,
  }

  render() {
    const SceneView = this.props.view;
    const {navigator, routes, index} = this.props;

    return (
      <View style={ styles.wrapper }>
        <SceneView navigator={ navigator } routes={ routes } />
        { index !== 0 ? <BottomNavbar
          navigator={ navigator }
          activeViewIndex={ index }
          routes={ routes } /> : null }
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

export default class AppNavigator extends Component {
  render() {
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={[routes[0]]}
        type='replace'
        renderScene={(route, navigator) =>
          <SceneComponent
            type='replace'
            key={ route.index }
            view={ route.view }
            index={ route.index }
            navigator={ navigator }
            routes={ routes } />
        }
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.FadeAndroid}
      />
    );
  }
}