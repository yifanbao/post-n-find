import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

class FoundNoticeInput extends Component {
  state = {
    title: ''
  };

  titleChangedHandler = val => {
    this.setState({
      title: val
    })
  };

  noticeCreateHandler = () => {
    const { title } = this.state;
    if (title.trim() === '') {
      return;
    }

    this.props.onNoticeCreated(title);
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.titleInput}
          placeholder="Input your title"
          value={this.state.title}
          onChangeText={this.titleChangedHandler}
        />
        <Button
          title="Create"
          style={styles.createButton}
          onPress={this.noticeCreateHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleInput: {
    width: "70%"
  },
  createButton: {
    width: "30%"
  },
});

export default FoundNoticeInput;
