import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableHighlight,
  Dimensions,
  Modal,
} from 'react-native';
import MapView from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchLocations, fetchTags, requestLocations } from '../actions/locations-actions';
import Loading from '../components/global/Loading';
import ModalFilter from '../components/modal-filter';
import BottomNavbar from '../components/global/bottom-navbar';
import Header from '../components/global/header';

const window = Dimensions.get('window');

class LocationsView extends Component {
  static propTypes = {
    isFetchingLocations: PropTypes.bool.isRequired,
    isFetchingTags: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    locationsData: PropTypes.array,
    tagsData: PropTypes.array,
    navigator: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      region: null,
      initialRegion: null,
      renderMap: false,
      locations: [],
      modalVisible: false,
      selectedTags: [],
      coords: null,
    };

    this.filterByTags = this.filterByTags.bind(this);
  }

  componentDidMount() {
    const {
      dispatch,
      // navigation: { setParams }
    } = this.props;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          // latitude: 44.81755481,
          // longitude: 20.45967579,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        };

        this.onRegionChange(null, initialRegion);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 10000}
    );

    dispatch(fetchLocations());
    dispatch(fetchTags());
    // setParams({ handleModalFilter: () => this.setModalVisible()});
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    // if (nextProps.cardData && !nextProps.cardData.activated && nextProps.cardData.valid ) {
    //   dispatch(updateDiscountCard(nextProps.cardData));
    // }
  }

  onRegionChange(region, initialRegion) {
    this.setState({
      region: region,
      initialRegion: initialRegion,
    });
    this.filterLocations(region);
  }

  filterLocations(coords) {
    const { locationsData, isFetchingLocations } = this.props;
    const { selectedTags } = this.state;

    if (locationsData.length > 0 && coords) {
      const latMin = coords.latitude - coords.latitudeDelta;
      const latMax = coords.latitude + coords.latitudeDelta;
      const lonMin = coords.longitude - coords.longitudeDelta;
      const lonMax = coords.longitude + coords.longitudeDelta;

      filteredLocations = locationsData.filter((location) => {
        if (
          location.coordinate.latitude >= latMin &&
          location.coordinate.latitude <= latMax &&
          location.coordinate.longitude >= lonMin &&
          location.coordinate.longitude <= lonMax
        ) {
          if (selectedTags.length > 0) {
            let renderLocation = false;

            location.tags.forEach(locationTag => {
              if (selectedTags.includes(locationTag)) {
                renderLocation = true;
              }
            });

            if (renderLocation) {
              return location;
            } else {
              return;
            }
          }
          return location;
        }
      });

      this.setState({
        locations: filteredLocations,
        coords: coords
      });
    }
  }

  filterByTags(tagId) {
    const { coords, selectedTags } = this.state;

    if (selectedTags.includes(tagId)) {
      const index = selectedTags.indexOf(tagId);
      selectedTags.splice(index, 1);
    } else {
      selectedTags.push(tagId)
    }

    this.setState({
      selectedTags: selectedTags
    });

    this.filterLocations(coords);
  }

  setModalVisible() {
    const { modalVisible } = this.state;
    this.setState({modalVisible: !modalVisible});
  }

  render() {
    const {
      isFetchingLocations,
      tagsData,
      navigator,
      routes
    } = this.props;
    const {
      region,
      initialRegion,
      locations,
      selectedTags,
      modalVisible
    } = this.state;

    return (
      <View style={ styles.wrapper }>
        <Header
          headerTitle='Locations'
          rightButton={{
            icon: 'ios-funnel-outline',
            text: '',
            handleButtonClick: () => this.setModalVisible()
          }}
        />
        <View style={ styles.container }>
          { initialRegion || region ?
            <MapView
              style={ styles.mapWrapper }
              showsUserLocation={ true }
              region={ region ? region : initialRegion }
              onRegionChangeComplete={ (regionCoords) => this.onRegionChange(regionCoords)} >
              { locations.length > 0 ? locations.map((marker, index) => (
                <MapView.Marker
                  key={ index }
                  coordinate={marker.coordinate}
                  title={marker.name}
                  description={marker.address} />
              )) : null }
            </MapView> : null }
          <ModalFilter
            tagsData={ tagsData }
            filterByTags={ this.filterByTags }
            selectedTags={ selectedTags }
            setModalVisible={ () => { this.setModalVisible()} }
            modalVisible={ modalVisible } />
          { isFetchingLocations ? <Loading /> : null }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  mapWrapper: {
    height: window.height - 120,
    position: 'absolute',
    left: 0,
    top: 0,
    flex: 1,
    zIndex: 0,
    width: window.width,
  },
  filterBar: {
    backgroundColor: '#2d2d2d',
    width: window.width,
    marginTop: 0
  },
  filterBarLabel: {
    color: '#e9e9e9',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },
  modalTags: {
    color: '#e9e9e9',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  validIndicatorWrapper: {
    textAlign: 'center',
  },
  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: window.height - 80,
    position: 'absolute',
    left: 0,
    top: 0,
    flex: 1,
    zIndex: 1,
    width: window.width,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
});

const mapStateToProps = state => {
  const { locations } = state;
  const {
    isFetchingLocations,
    locationsData
  } = locations.locationsData || {
    isFetchingLocations: false,
    locationsData: [],
  };

  const {
    isFetchingTags,
    tagsData
  } = locations.tagsData || {
    isFetchingTags: false,
    tagsData: [],
  };

  return {
    isFetchingTags,
    isFetchingLocations,
    locationsData,
    tagsData,
  }
}

export default connect(mapStateToProps)(LocationsView);
