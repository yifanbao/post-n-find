import React, { Component } from 'react';
import { StyleSheet, Dimensions, FlatList, TouchableOpacity, Text, Image } from 'react-native';

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
        numColumns={2}
        columnWrapperStyle={{marginBottom: 5, marginRight: 15}}
      />
    )
  }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    backgroundColor: "#EEF1F8"
  },
  listItem: {
    width: "50%",
    alignItems: "center",
    marginLeft: 5,
    padding: 10,
    borderRadius: 2,
    backgroundColor: "#FFFFFF"
  },
  itemImage: {
    marginBottom: 10,
    height: (win.width - 55) / 2,
    width: (win.width - 55) / 2
  }
});

export default FoundNoticeList;
