import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Animated, View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';

import FoundNoticeList from '../components/FoundNoticeList';
import { getFoundNotices } from '../store/actions/index';

class ViewFoundNotice extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

    this.state = {
      isListLoaded: false,
      removeAnimation: new Animated.Value(0.99),
      listAnimation: new Animated.Value(0)
    };
  }

  onNavigatorEvent = event => {
    if (event.type === 'ScreenChangedEvent') {
      if (event.id === 'willAppear') {
        this.props.onLoadFoundNotices();
      }
    }
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({ side: 'left' })
      }
    }
  };

  noticesSearchHandler = () => {
    Animated.timing(this.state.removeAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        isListLoaded: true
      });
      this.listLoadedHandler();
    });
  };

  listLoadedHandler = () => {
    Animated.timing(this.state.listAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  itemSelectedHandler = key =>{
    const notice = this.props.foundNotices.find(notice => {
      return notice.key === key;
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
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnimation,
          transform: [
            { scale: this.state.removeAnimation.interpolate({ inputRange: [0, 1], outputRange: [12, 1] }) }
          ]
        }}
      >
        <TouchableOpacity onPress={this.noticesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Item</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );

    if (this.state.isListLoaded) {
      content = (
        <Animated.View style={{ opacity: this.state.listAnimation }}>
          <FoundNoticeList
            foundNotices={this.props.foundNotices}
            onItemSelected={this.itemSelectedHandler}
          />
        </Animated.View>
      )
    }

    return (
      <ScrollView contentContainerStyle={this.state.isListLoaded ? styles.listContainer : styles.buttonContainer}>
        {content}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  listContainer: {
    backgroundColor: "#EEF1F8"
  },
  searchButton: {
    borderWidth: 3,
    borderRadius: 50,
    borderColor: "orange",
    padding: 20
  },
  searchButtonText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "orange"
  }
});

const mapStateToProps = ({ foundNotices }) => {
  return foundNotices;
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadFoundNotices: () => dispatch(getFoundNotices())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewFoundNotice);
