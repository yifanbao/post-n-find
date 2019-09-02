import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

import { Text } from '../components/UI/Text';
import { Divider } from '../components/UI/Divider';
import { deleteLostNotice } from '../store/actions';
import COLORS from '../styles/colors';

class LostNoticeDetail extends Component {
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
      <ScrollView style={[styles.container, isPortrait ? null : styles.landscapeContainer]}>
        <View style={styles.subContainer}>
          <Image style={styles.noticeImage} source={this.props.notice.image} />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.title}>{this.props.notice.title}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={this.props.notice.description ? null : styles.noDescription}>
            {this.props.notice.description || "(No Description)"}
          </Text>
        </View>
        <Divider />
        <View style={[styles.subContainer, styles.dateContainer]}>
          <Icon
            name={Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar'}
            style={styles.dateIcon}
            size={18}
            color={COLORS.PURPLE_GRAY}
          />
          <Text>
            {this.props.notice.date}
          </Text>
        </View>
        <View style={[styles.subContainer, styles.mapContainer]}>
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
        {/*<View style={styles.subContainer}>
          <TouchableOpacity onPress={this.noticeDeletedHandler}>
            <View style={styles.deleteButton}>
              <Icon
                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                size={30}
                color="red"
              />
            </View>
          </TouchableOpacity>
        </View>*/}
      </ScrollView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    margin: 15
  },
  landscapeContainer: {
    flexDirection: "row"
  },
  subContainer: {
    maxHeight: 200,
    marginVertical: 5
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  mapContainer: {
    height: 200
  },
  noticeImage: {
    width: "100%",
    height: 200
  },
  title: {
    fontSize: 24,
    fontWeight: "500"
  },
  noDescription: {
    color: COLORS.GRAY_LIGHTEN_2
  },
  dateIcon: {
    marginRight: 5
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
    onDeleteNotice: key => dispatch(deleteLostNotice(key))
  };
};

export default connect(null, mapDispatchToProps)(LostNoticeDetail);
