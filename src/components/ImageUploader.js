import React, { Component } from 'react';
import { StyleSheet, Image, View, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker';

import { TextButton } from './UI/Button';
import COLORS from '../styles/colors';

class ImageUploader extends Component {
  initialState = {
    pickedImage: null
  };

  constructor(props) {
    super(props);
    this.state = { ...this.initialState };
  }

  reset = () => {
    this.setState({ ...this.initialState })
  };

  pickImageHandler = () => {
    const options = {
      title: 'Pick an Image',
      maxWidth: 30,
      maxHeight: 30
    };
    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel) {
        console.log('User Canceled');
      } else if (res.error) {
        console.log('Error', res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });
        this.props.onPickImage({ uri: res.uri, base64: res.data })
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image style={styles.imagePreview} source={this.state.pickedImage} />
        </View>
        <View style={styles.buttonContainer}>
          <TextButton title="Upload Image" onPress={this.pickImageHandler} />
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
  placeholder: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    backgroundColor: COLORS.GRAY_LIGHTEN_4
  },
  buttonContainer: {
    margin: 8
  },
  imagePreview: {
    width: "100%",
    height: "100%"
  }
});

export default ImageUploader;
