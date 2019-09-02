import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import LostNoticeList from '../components/LostNoticeList';
import { getLostNotices } from '../store/actions/index';
import COLORS from '../styles/colors';

class ViewLostNotice extends Component {
  static navigatorStyle = {
    navBarButtonColor: COLORS.PURPLE_GRAY
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === 'ScreenChangedEvent') {
      if (event.id === 'willAppear') {
        this.props.onLoadLostNotices();
      }
    }
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({ side: 'left' })
      }
    }
  };

  itemSelectedHandler = key =>{
    const notice = this.props.lostNotices.find(notice => {
      return notice.key === key;
    });
    this.props.navigator.push({
      screen: 'post-n-find.LostNoticeDetailScreen',
      title: notice.title,
      passProps: {
        notice
      }
    });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.listContainer} endFillColor={COLORS.GRAY_LIGHTEN_4}>
        <View>
          <LostNoticeList
            lostNotices={this.props.lostNotices}
            onItemSelected={this.itemSelectedHandler}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: COLORS.GRAY_LIGHTEN_4
  }
});

const mapStateToProps = ({ lostNotices }) => {
  return lostNotices;
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadLostNotices: () => dispatch(getLostNotices())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewLostNotice);
