import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';

import { createFoundNotice } from '../store/actions/index';
import { HeaderText, TextInput } from '../components/UI/Text';
import { Button } from '../components/UI/Button';
import ImageUploader from '../components/ImageUploader';
import LocationPicker from '../components/LocationPicker';

class PostFoundNotice extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

    this.state = {
      controls: {
        title: { value: '', isValid: false, validationRules: { notEmpty: true }, isTouched: false },
        location: { value: null, isValid: false }
      }
    };
  }

  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  onNavigatorEvent = event => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({ side: 'left' })
      }
    }
  };

  titleChangedHandler = value => {
    this.setState(({ controls }) => {
      return {
        controls: {
          ...controls,
          title: { ...controls.title, value, isValid: !!value.length }
        }
      }
    });
  };

  locationPickedHandler = location => {
    this.setState(({ controls }) => {
      return {
        controls: {
          ...controls,
          location: { value: location, isValid: true }
        }
      }
    })
  };

  noticeCreatedHandler = () => {
    const { title, location } = this.state.controls;
    this.props.onNoticeCreated(title.value, location.value);
  };

  render() {
    const { title, location } = this.state.controls;
    let isFormValid = title.isValid && location.isValid;

    return (
      <ScrollView>
        <View style={styles.container}>
          <HeaderText>New Found Notice</HeaderText>
          <TextInput
            placeholder="Input your title"
            value={this.state.controls.title.value}
            onChangeText={this.titleChangedHandler}
          />
          <ImageUploader />
          <LocationPicker onPickLocation={this.locationPickedHandler} />
          <View style={styles.buttonContainer}>
            <Button title="Post" disabled={!isFormValid} onPress={this.noticeCreatedHandler} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  buttonContainer: {
    margin: 8
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onNoticeCreated: (title, location) => dispatch(createFoundNotice(title, location))
  };
};

export default connect(null, mapDispatchToProps)(PostFoundNotice);
