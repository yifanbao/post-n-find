import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text, Image } from 'react-native';

class FoundNoticeList extends Component {
  render() {
    const ListItem = ({ key, title, image }) => (
      <TouchableOpacity style={styles.listItem} key={key} onPress={() => this.props.onItemSelected(key)}>
        <Image style={styles.itemImage} source={image} resizeMode="cover" />
        <Text>{title}</Text>
      </TouchableOpacity>
    );

    return (
      <FlatList
        style={styles.listContainer}
        data={this.props.foundNotices}
        renderItem={info => ListItem(info.item)}
      />
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  },
  listItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    padding: 10,
    backgroundColor: "#eee"
  },
  itemImage: {
    marginRight: 8,
    height: 30,
    width: 30
  }
});

export default FoundNoticeList;
