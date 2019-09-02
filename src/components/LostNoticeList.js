import React, { Component } from 'react';
import { StyleSheet, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';

import { Text } from './UI/Text';
import COLORS from '../styles/colors';

class LostNoticeList extends Component {
  render() {
    const ListItem = ({ key, title, image, date }) => (
      <TouchableOpacity style={styles.listItem} key={key} onPress={() => this.props.onItemSelected(key)}>
        <Image style={styles.itemImage} source={image} resizeMode="cover" />
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDate}>{date}</Text>
      </TouchableOpacity>
    );

    return (
      <FlatList
        style={styles.listContainer}
        data={this.props.lostNotices}
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
    backgroundColor: COLORS.GRAY_LIGHTEN_4
  },
  listItem: {
    width: "50%",
    alignItems: "flex-start",
    marginLeft: 5,
    padding: 10,
    borderRadius: 2,
    backgroundColor: COLORS.WHITE
  },
  itemImage: {
    height: (win.width - 55) / 2,
    width: (win.width - 55) / 2
  },
  itemTitle: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "500"
  },
  itemDate: {
    fontSize: 12,
    color: COLORS.GRAY
  }
});

export default LostNoticeList;
