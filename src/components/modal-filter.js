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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const window = Dimensions.get('window');

class ModalFilter extends Component {
  static PropTypes = {
    modalVisible: PropTypes.boolean,
    tagsData: PropTypes.array,
    selectedTags: PropTypes.array,
    setModalVisible: PropTypes.func,
    filterByTags: PropTypes.func,
  }

  render() {
    const { modalVisible, tagsData, setModalVisible } = this.props;

    return (
      <Modal
        animationType={'slide'}
        transparent={ true }
        visible={ modalVisible }
        onRequestClose={() => {alert("Modal has been closed.")}} >
        <ScrollView style={ styles.modalContainer }>
          { this.renderFilterOptions() }
          <Button
            onPress={ setModalVisible }
            title="Close Filter"
            color="#b22222" />
        </ScrollView>
      </Modal>
    );
  }

  renderFilterOptions() {
    const { tagsData, selectedTags } = this.props;

    return (
      <View style={ styles.optionsWrapper }>
        { tagsData.length > 0 ? tagsData.map((tag, index) => {
          const selected = selectedTags.includes(tag.tagId);
          const tagIcon = this.tagIcon(tag.tagId);

          return (
            <TouchableHighlight
              style={ [styles.filterOptioin, selected ? styles.filterOptioinSelected : null] }
              key={ index }
              onPress={() => this.handleTagClick(tag.tagId)}>
              <View style={ styles.filterOptionInner }>
                <Ionicons
                  name={ tagIcon }
                  size={ 26 }
                  color={ selected ? '#222222' : '#e9e9e9' } />
                <Text style={ [styles.modalTagsText, selected ? { color: '#222222' } : { color: '#e9e9e9' }] }>{ tag.name }</Text>
              </View>
            </TouchableHighlight>
          )
        }) : null }
      </View>

    );
  }

  handleTagClick(tagId) {
    const { tagsData, filterByTags } = this.props;

    filterByTags(tagId);
  }

  tagIcon(tagId) {
    switch (tagId) {
      case '8': //drink
        return 'ios-beer'
      case '7': //food
        return 'ios-restaurant'
      case '4': //night club
        return 'ios-wine'
      default:
        return 'ios-funnel-outline'
    }
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  modalTagsText: {
    marginTop: 5
  },
  optionsWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  filterOptioin: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    margin: 0.5,
    width: 100,
    height: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterOptioinSelected: {
    backgroundColor: 'goldenrod',
  },
  filterOptionInner: {
    width: 100,
    height: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ModalFilter;
