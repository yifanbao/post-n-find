import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Button, Text } from 'react-native';
import MapView from 'react-native-maps';

import { TextButton } from './UI/Button';
import COLORS from '../styles/colors';

class LocationPicker extends Component {
  initialState = {
    focusedLocation: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.122
    },
    isLocationPicked: false
  };

  constructor(props) {
    super(props);
    this.state = { ...this.initialState };
  }

  reset = () => {
    this.setState({ ...this.initialState })
  };

  pickLocationHandler = event => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude,
      longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude,
          longitude
        },
        isLocationPicked: true
      }
    });
    this.props.onPickLocation({ latitude, longitude })
  };

  getCurrentLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude,
              longitude
            }
          }
        };
        this.pickLocationHandler(coordsEvent);
      },
      err => {
        console.log(err);
        alert('Fetching position failed. Please pick one manually.')
      })
  };

  render() {
    let mapMarker = null;

    if (this.state.isLocationPicked) {
      mapMarker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    }

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.focusedLocation}
          onPress={this.pickLocationHandler}
          ref={ref => this.map = ref}
        >
          {mapMarker}
        </MapView>
        <View style={styles.buttonContainer}>
          <TextButton title="Locate Me" onPress={this.getCurrentLocationHandler} />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 10
  },
  map: {
    width: "100%",
    height: 250,
    borderWidth: 1,
    borderColor: COLORS.GRAY_DARKEN_3,
    backgroundColor: COLORS.GRAY_LIGHTEN_4
  },
  buttonContainer: {
    margin: 8
  }
});

export default LocationPicker;
