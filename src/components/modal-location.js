import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Modal,
  Button,
  TouchableHighlight,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from './global/header';
import Swiper from 'react-native-swiper';

const window = Dimensions.get('window');

class ModalLocation extends Component {
  static PropTypes = {
    modalVisible: PropTypes.boolean,
    locationDetail: PropTypes.obj,
    setModalVisible: PropTypes.func,
  }

  render() {
    const {
      modalVisible,
      locationDetail,
      setModalVisible,
    } = this.props;

    return (
      <Modal
        animationType={'slide'}
        transparent={ true }
        visible={ modalVisible }
        onRequestClose={() => {alert("Modal has been closed.")}} >
        <Header
          headerTitle={ locationDetail ? locationDetail.name : 'Location Detail' }
          rightButton={{
            icon: 'ios-close-circle-outline',
            text: '',
            handleButtonClick: setModalVisible
          }}
          leftIcon={{
            icon: 'ios-pin',
            color: '#e9e9e9'
          }}
        />
        <ScrollView style={ styles.modalContainer }>
          { locationDetail ? this.renderContent() : null }
          {/*<View style={ styles.buttonsWrapper }>*/}
            {/*<Button*/}
              {/*onPress={ setModalVisible }*/}
              {/*title="Close Filter"*/}
              {/*color="#b22222" />*/}
          {/*</View>*/}
        </ScrollView>
      </Modal>
    );
  }

  renderContent() {
    const {
      locationDetail: {
        name,
        address,
        description,
        discountAmount,
        images,
        locationId,
        coordinate,
        tags,
      }
    } = this.props;

    return (
      <View>
        <View style={ styles.contentWrapper }>
          <Text style={ styles.textStyle }>{ description }</Text>
          <View style={ styles.discountAmountWrapper }>
            <Text style={ styles.discountAmount }>-{ discountAmount }%</Text>
          </View>
        </View>
        { images ?
          <Swiper
            style={styles.sliderWrapper}
            dotColor='#e9e9e9'
            activeDotColor='#b22222'
            nextButton={ <Text style={styles.arrowStyle}>›</Text> }
            prevButton={ <Text style={styles.arrowStyle}>‹</Text> }
            showsButtons={true}>
            { images.map((img, index) => {
              return (
                <Image key={index} source={{uri: img, cache: 'only-if-cached'}} style={styles.backgroundImage} />
              )
            }) }
          </Swiper> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  contentWrapper: {
    padding: 15,
  },
  modalTagsText: {
    marginTop: 5
  },
  textStyle: {
    color: 'white'
  },
  discountAmount: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#b22222',
    padding: 3,
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 14,
  },
  discountAmountWrapper: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 15
  },
  sliderWrapper: {

  },
  backgroundImage: {
    flex: 1
  },
  arrowStyle: {
    color: '#b22222',
    fontSize: 60
  }
});

export default ModalLocation;
