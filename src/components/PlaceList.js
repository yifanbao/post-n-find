import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text, Image } from 'react-native';

class PlaceList extends Component {
  render() {
    const ListItem = ({ key, name, image }) => (
      <TouchableOpacity style={styles.listItem} key={key} onPress={() => this.props.onPlaceSelected(key)}>
        <Image style={styles.placeImage} source={image} resizeMode="cover" />
        <Text>{name}</Text>
      </TouchableOpacity>
    );

    return (
      <FlatList
        style={styles.listContainer}
        data={this.props.places}
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
  placeImage: {
    marginRight: 8,
    height: 30,
    width: 30
  }
});

export default PlaceList;
