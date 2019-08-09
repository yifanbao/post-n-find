import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';

import PlaceInput from './src/components/PlaceInput';
import PlaceList from './src/components/PlaceList';
import PlaceDetail from './src/components/PlaceDetail';
import placeImage from './src/assets/NYC.jpeg';

type Props = {};
export default class App extends Component<Props> {
  state = {
    places: [],
    selectedPlace: null
  };

  placeAddedHandler = placeName => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random().toString(),
          name: placeName,
          image: placeImage
        })
      }
    })
  };

  placeSelectedHandler = selectedKey => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(({ key }) => {
          return key === selectedKey;
        })
      }
    })
  };

  placeDeletedHandler = () => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(({ key }) => {
          return key !== prevState.selectedPlace.key;
        }),
        selectedPlace: null
      }
    })
  };

  modalClosedHandler = () => {
    this.setState({
      selectedPlace: null
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail place={this.state.selectedPlace} onPlaceDeleted={this.placeDeletedHandler} onModalClosed={this.modalClosedHandler} />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList places={this.state.places} onPlaceSelected={this.placeSelectedHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
