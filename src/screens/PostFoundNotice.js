import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Button, Image } from 'react-native';
import { connect } from 'react-redux';

import { createFoundNotice } from '../store/actions/index';
import { HeaderText } from '../components/UI/Text';
import TitleInput from '../components/TitleInput';
import ImageUploader from '../components/ImageUploader';
import LocationPicker from '../components/LocationPicker';

class PostFoundNotice extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  state = {
    title: ''
  };

  onNavigatorEvent = event => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({ side: 'left' })
      }
    }
  };

  titleChangedHandler = val => {
    this.setState({
      title: val
    });
  };

  noticeCreatedHandler = () => {
    const { title } = this.state;
    if (!title.trim()) {
      return;
    }

    this.props.onNoticeCreated(title);
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <HeaderText>New Found Notice</HeaderText>
          <TitleInput title={this.state.title} onChangeText={this.titleChangedHandler} />
          <ImageUploader />
          <LocationPicker />
          <View style={styles.buttonContainer}>
            <Button title="Post" onPress={this.noticeCreatedHandler} />
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
    onNoticeCreated: title => dispatch(createFoundNotice(title))
  };
};

export default connect(null, mapDispatchToProps)(PostFoundNotice);
