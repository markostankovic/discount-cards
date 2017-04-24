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
          <View style={ styles.modalHeader }>
            <TouchableHighlight onPress={ setModalVisible }>
              <Ionicons
                name='ios-close-circle-outline'
                size={ 26 }
                color='#e9e9e9'
              />
            </TouchableHighlight>
          </View>
          { this.renderFilterOptions() }
          <View style={ styles.buttonsWrapper }>
            <Button
              onPress={ setModalVisible }
              title="Close Filter"
              color="#b22222" />
          </View>
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

          return (
            <TouchableHighlight
              style={ [styles.filterOptioin, selected ? styles.filterOptioinSelected : null] }
              key={ index }
              onPress={() => this.handleTagClick(tag.tagId)}>
              <View style={ styles.filterOptionInner }>
                <Ionicons
                  name={ tag.icon }
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
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOptioin: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    margin: 0.5,
    flexBasis: (window.width / 3) - 1,
    width: (window.width / 3) - 1,
    height: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 0,
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
  },
  modalHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 50,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 15,
  },
  buttonsWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10
  }
});

export default ModalFilter;
