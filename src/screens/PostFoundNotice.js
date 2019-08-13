import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import FoundNoticeInput from '../components/FoundNoticeInput';
import { createFoundNotice } from '../store/actions/index';

class PostFoundNotice extends Component {
  render() {
    return (
      <View>
        <FoundNoticeInput onNoticeCreated={this.props.onNoticeCreated} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNoticeCreated: title => dispatch(createFoundNotice(title))
  };
};

export default connect(null, mapDispatchToProps)(PostFoundNotice);
