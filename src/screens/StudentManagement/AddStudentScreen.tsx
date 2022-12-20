import React, {useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddStudentScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | undefined>(
    'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png',
  );
  const handleChoosePhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      res => {
        if (res?.assets) {
          setAvatar(res?.assets[0]?.uri);
        }
      },
    );
  };
  const handleTakePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
      },
      res => {
        if (res?.assets) {
          setAvatar(res?.assets[0]?.uri);
        }
      },
    );
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={styles.modal}>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text>Close the modal</Text>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => setModalVisible(true)}>
        <Image source={{uri: avatar}} style={styles.image} resizeMode="cover" />
        <View style={styles.imageIcon}>
          <Icon name="camera" size={24} color="#dc3545" />
        </View>
      </TouchableOpacity>
      <></>
    </View>
  );
};

export default AddStudentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 1000,
    backgroundColor: 'red',
    alignSelf: 'center',
    marginTop: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageIcon: {
    position: 'absolute',
  },
  modal: {
    flex: 1,
    backgroundColor: '#1e293b',
  },
});
