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
import Loading from '../components/Global/Loading';

const window = Dimensions.get('window');

class LocationsView extends Component {
  static propTypes = {
    isFetchingLocations: PropTypes.bool.isRequired,
    isFetchingTags: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    locationsData: PropTypes.array,
    tagsData: PropTypes.array,
  }

  static navigationOptions = {
    title: 'Locations',
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      visible: true,
      title: 'Locations',
      style: {
        backgroundColor: '#222222',
      },
      tintColor: '#e9e9e9',
      right: (
        <TouchableHighlight style={{ padding: 15 }} onPress={() => navigation.state.params.handleModalFilter()}>
          <Ionicons
            name='ios-funnel-outline'
            size={ 26 }
            color='#e9e9e9'
          />
        </TouchableHighlight>
      ),
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      region: null,
      initialRegion: null,
      renderMap: false,
      locations: [],
      modalVisible: false,
    };
  }

  componentDidMount() {
    const {
      dispatch,
      navigation: { setParams }
    } = this.props;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialRegion = {
          // latitude: position.coords.latitude,
          // longitude: position.coords.longitude,
          latitude: 44.81755481,
          longitude: 20.45967579,
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
    setParams({ handleModalFilter: () => this.setModalVisible()});
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
          return location;
        }
      });

      console.log('---filteredLocations--', filteredLocations);
      this.setState({locations: filteredLocations});
    }
  }

  setModalVisible() {
    const { modalVisible } = this.state;
    this.setState({modalVisible: !modalVisible});
  }

  render() {
    const { isFetchingLocations } = this.props;
    const { region, initialRegion, locations } = this.state;

    return (
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
        { this.renderFilterModal() }
        { isFetchingLocations ? <Loading /> : null }
      </View>
    );
  }

  renderFilterModal() {
    const { isFetchingTags, tagsData } = this.props;

    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}} >
        <View style={ styles.modalContainer }>
          <View>
            { tagsData.length > 0 ? tagsData.map((tag, index) => (
              <Text style={ styles.modalTags }>{ tag.name }</Text>
            )) : null }
            <Button
              onPress={() => { this.setModalVisible()}}
              title="Close Filter"
              color="#b22222" />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'whitesmoke'
  },
  mapWrapper: {
    height: window.height - 80,
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
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
