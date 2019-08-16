import React, { Component } from 'react';
import {StyleSheet, Platform, Dimensions, TouchableOpacity, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

import { deleteFoundNotice } from '../store/actions';

class FoundNoticeDetail extends Component {
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateViewMode);

    this.state = {
      viewMode: Dimensions.get('window').height > 500 ? 'portrait': 'landscape'
    }
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateViewMode);
  }

  updateViewMode = ({ window }) => {
    this.setState({
      viewMode: window.height > 500 ? 'portrait': 'landscape'
    })
  };

  noticeDeletedHandler = () => {
    this.props.onDeleteNotice(this.props.notice.key);
    this.props.navigator.pop();
  };

  render() {
    let isPortrait = this.state.viewMode === 'portrait';

    return (
      <View style={[styles.container, isPortrait ? null : styles.landscapeContainer]}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>{this.props.notice.title}</Text>
        </View>
        <View style={styles.subContainer}>
          <Image style={styles.noticeImage} source={this.props.notice.image} />
        </View>
        <View style={styles.subContainer}>
          <MapView
            style={styles.mapView}
            initialRegion={{
            ...this.props.notice.location,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.122
            }}
          >
            <MapView.Marker coordinate={this.props.notice.location} />
          </MapView>
        </View>
        <View style={styles.subContainer}>
          <TouchableOpacity onPress={this.noticeDeletedHandler}>
            <View style={styles.deleteButton}>
              <Icon
                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                size={30}
                color="red"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 22
  },
  landscapeContainer: {
    flexDirection: "row"
  },
  subContainer: {
    flex: 1
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold"
  },
  noticeImage: {
    width: "100%",
    height: 200
  },
  mapView: {
    ...StyleSheet.absoluteFillObject
  },
  deleteButton: {
    alignItems: "center"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeleteNotice: key => dispatch(deleteFoundNotice(key))
  };
};

export default connect(null, mapDispatchToProps)(FoundNoticeDetail);
