import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { deleteFoundNotice } from '../store/actions';

import Icon from 'react-native-vector-icons/Ionicons';

class FoundNoticeDetail extends Component {
  noticeDeletedHandler = () => {
    this.props.onDeleteNotice(this.props.notice.key);
    this.props.navigator.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.noticeImage} source={this.props.notice.image}/>
        <Text style={styles.title}>{this.props.notice.title}</Text>
        <View>
          <TouchableOpacity onPress={this.noticeDeletedHandler}>
            <View style={styles.deleteButton}>
              <Icon size={30} name="ios-trash" color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  noticeImage: {
    width: "100%",
    height: 200
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold"
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
