import {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function useAvatar(studenAvatar?: string) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | undefined>(studenAvatar || '');
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
    setModalVisible(false);
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
    setModalVisible(false);
  };
  return {
    modalVisible,
    setModalVisible,
    avatar,
    handleChoosePhoto,
    handleTakePhoto,
  };
}
