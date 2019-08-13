import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import FoundNoticeList from '../components/FoundNoticeList';

class ViewFoundNotice extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({ side: 'left' })
      }
    }
  };

  itemSelectedHandler = key =>{
    const notice = this.props.foundNotices.find(place => {
      return place.key === key;
    });
    this.props.navigator.push({
      screen: 'post-n-find.FoundNoticeDetailScreen',
      title: notice.title,
      passProps: {
        notice
      }
    });
  };

  render() {
    return (
      <View>
        <FoundNoticeList foundNotices={this.props.foundNotices} onItemSelected={this.itemSelectedHandler} />
      </View>
    );
  }
}

const mapStateToProps = ({ foundNotices }) => {
  return foundNotices;
};

export default connect(mapStateToProps)(ViewFoundNotice);
