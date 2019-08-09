import React from 'react';
import { StyleSheet, Modal, View, Image, Text, Button } from 'react-native';

const PlaceDetail = props => {
  let modalContent = null;

  if (props.place) {
    modalContent = (
      <View>
        <Image style={styles.placeImage} source={props.place.image}/>
        <Text style={styles.placeName}>{props.place.name}</Text>
      </View>
    )
  }

  return (
    <Modal visible={!!modalContent} animationType="slide" onRequestClose={props.onModalClosed}>
      <View style={styles.modalContainer}>
        {modalContent}
        <View>
          <Button title="Delete" color="red" onPress={props.onPlaceDeleted} />
          <Button title="Close" onPress={props.onModalClosed} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 22
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold"
  }
});

export default PlaceDetail;
