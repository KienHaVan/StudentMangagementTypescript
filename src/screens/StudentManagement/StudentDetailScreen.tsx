import {yupResolver} from '@hookform/resolvers/yup';
import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
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
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput';
import TopBackButton from '../../components/TopBackButton';
import {StudentType} from '../../types/data.types';
import {StudetnDetailRouteProp} from '../../types/navigation.types';

const schema = yup
  .object({
    name: yup
      .string()
      .required('Please insert your name')
      .max(20, 'Your name should be 20 charaters or less'),
    age: yup
      .number()
      .required('Please insert your age')
      .min(5, 'Your age should be 5 or higher')
      .max(60, 'Your age should be 60 or less'),
    email: yup
      .string()
      .lowercase()
      .required('Please insert your email')
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Enter the valid email',
      ),
  })
  .required();

const StudentDetailScreen = () => {
  const route = useRoute<StudetnDetailRouteProp>();
  const studentData = route.params.studentData;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | undefined>(studentData.avatar);
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
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<StudentType>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<StudentType> = data => {
    console.log(data);
  };

  return (
    <View>
      <TopBackButton />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={styles.modal}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={handleTakePhoto}
            style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Take a photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleChoosePhoto}
            style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Choose from library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => setModalVisible(true)}>
        <Image
          source={{
            uri: avatar,
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageIcon}>
          <Icon name="camera" size={24} color="#dc3545" />
        </View>
      </TouchableOpacity>
      {!avatar && <Text style={styles.error}>Choose an avatar</Text>}
      <View>
        <Text style={styles.heading}>1. Full Name</Text>
        <CustomInput
          control={control}
          placeholder="Enter your full name"
          name="name"
          defaultValue={studentData.name}
        />
        {errors?.name && (
          <Text style={styles.error}>{errors.name.message}</Text>
        )}
        <Text style={styles.heading}>2. Age</Text>
        <CustomInput
          control={control}
          placeholder="Enter your age"
          name="age"
          keyboardType="numeric"
          defaultValue={studentData.age.toString()}
        />
        {errors?.age && <Text style={styles.error}>{errors.age.message}</Text>}
        <Text style={styles.heading}>3. Email</Text>
        <CustomInput
          control={control}
          placeholder="Enter your email"
          name="email"
          defaultValue={studentData.email}
        />
        {errors?.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
      </View>
      <TouchableOpacity
        style={[styles.modalButton, styles.mainButton]}
        onPress={handleSubmit(onSubmit)}>
        <Text style={[styles.modalButtonText]}>Update student info</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StudentDetailScreen;

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
  },
  modalView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: 200,
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 30,
  },
  modalButton: {
    width: 280,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#dc3545',
    borderRadius: 28,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 20,
    color: '#fff',
  },
  heading: {
    fontWeight: '800',
    fontSize: 30,
    color: '#000',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 2,
    marginHorizontal: 20,
  },
  mainButton: {height: 60, marginTop: 30},
});
