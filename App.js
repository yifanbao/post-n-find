import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth';
import PostFoundNotice from './src/screens/PostFoundNotice';
import ViewFoundNotice from './src/screens/ViewFoundNotice';
import FoundNoticeDetail from './src/screens/FoundNoticeDetail';
import configStore from './src/store/configStore';

const store = configStore();

// Register Screens
Navigation.registerComponent('post-n-find.AuthScreen', () => AuthScreen, store, Provider);
Navigation.registerComponent('post-n-find.PostItem', () => PostFoundNotice, store, Provider);
Navigation.registerComponent('post-n-find.FindItem', () => ViewFoundNotice, store, Provider);
Navigation.registerComponent('post-n-find.FoundNoticeDetailScreen', () => FoundNoticeDetail, store, Provider);

// Start an App
Navigation.startSingleScreenApp({
  screen: {
    screen: 'post-n-find.AuthScreen',
    title: 'Login'
  }
});

/*
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import PlaceInput from './src/components/PlaceInput';
import PlaceList from './src/components/PlaceList';
import PlaceDetail from './src/components/PlaceDetail';
import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions/index';

type Props = {};
class App extends Component<Props> {
  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName);
  };

  placeSelectedHandler = key => {
    this.props.onSelectPlace(key);
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace();
  };

  modalClosedHandler = () => {
    this.props.onDeselectPlace();
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail place={this.props.selectedPlace} onPlaceDeleted={this.placeDeletedHandler} onModalClosed={this.modalClosedHandler} />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList places={this.props.places} onPlaceSelected={this.placeSelectedHandler} />
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

const mapStateToProps = ({ places }) => {
  return places;
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: name => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: key => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
*/
