import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { createFoundNotice } from '../store/actions/index';
import { TextInput, TitleText } from '../components/UI/Text';
import { Button } from '../components/UI/Button';
import { Divider } from '../components/UI/Divider';
import ImageUploader from '../components/ImageUploader';
import LocationPicker from '../components/LocationPicker';
import { startCreatingFoundNotice } from '../store/actions/index';

class PostFoundNotice extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  initialState = {
    controls: {
      title: { value: '', isValid: false, validationRules: { notEmpty: true }, isTouched: false },
      description: { value: '', isValid: true },
      location: { value: null, isValid: false },
      image: { value: null, isValid: false }
    }
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = { ...this.initialState };
  }

  componentDidUpdate() {
    if (this.props.foundNoticeCreated) {
      this.props.navigator.switchToTab({ tabIndex: 1 });
      this.reset();
    }
  }

  onNavigatorEvent = event => {
    if (event.type === 'ScreenChangedEvent') {
      if (event.id === 'willAppear') {
        this.props.onStartCreatingNotice();
      }
    }
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({ side: 'left' });
      }
    }
  };

  reset = () => {
    this.setState({ ...this.initialState });
    this.refs.imageUploader.reset();
    this.refs.locationPicker.reset();
  };

  titleChangedHandler = value => {
    this.setState(({ controls }) => {
      return {
        controls: {
          ...controls,
          title: { ...controls.title, value, isValid: !!value.length }
        }
      }
    })
  };

  descriptionChangedHandler = value => {
    this.setState(({ controls }) => {
      return {
        controls: {
          ...controls,
          description: { ...controls.description, value }
        }
      }
    })
  };

  imagePickedHandler = image => {
    this.setState(({ controls }) => {
      return {
        controls: {
          ...controls,
          image: { value: image, isValid: true }
        }
      }
    })
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
    const { title, image, location } = this.state.controls;
    this.props.onNoticeCreated(title.value, image.value, location.value);
  };

  render() {
    const { title, image, location } = this.state.controls;
    let isFormValid = title.isValid && image.isValid && location.isValid;

    let submitButton = (
      <Button title="Post" disabled={!isFormValid} onPress={this.noticeCreatedHandler} />
    );
    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <TitleText>Title</TitleText>
          <TextInput
            placeholder="Input your title"
            maxLength={40}
            autoFocus
            value={this.state.controls.title.value}
            onChangeText={this.titleChangedHandler}
          />
          <TitleText>Description(Optional)</TitleText>
          <TextInput
            placeholder="Describe what you found"
            maxLength={200}
            multiline = {true}
            numberOfLines = {4}
            value={this.state.controls.description.value}
            onChangeText={this.descriptionChangedHandler}
          />
          <TitleText>Photo</TitleText>
          <ImageUploader onPickImage={this.imagePickedHandler} ref="imageUploader" />
          <Divider />
          <TitleText>Location</TitleText>
          <LocationPicker onPickLocation={this.locationPickedHandler} ref="locationPicker" />
          <View style={styles.buttonContainer}>
            {submitButton}
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

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    foundNoticeCreated: state.foundNotices.newFoundNoticeCreated
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onNoticeCreated: (title, image, location) => dispatch(createFoundNotice(title, image, location)),
    onStartCreatingNotice: () => dispatch(startCreatingFoundNotice())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostFoundNotice);
