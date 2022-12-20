import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddStudentScreen = () => {
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
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={handleChoosePhoto}>
        <Image source={{uri: avatar}} style={styles.image} resizeMode="cover" />
        <View style={styles.imageIcon}>
          <Icon name="camera" size={24} color="#dc3545" />
        </View>
      </TouchableOpacity>
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
});
