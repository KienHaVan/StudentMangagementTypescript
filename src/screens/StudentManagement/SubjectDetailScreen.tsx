import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import TopBackButton from '../../components/TopBackButton';
import useAvatar from '../../hooks/useAvatar';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomInput from '../../components/CustomInput';
import * as yup from 'yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubjectType} from '../../types/data.types';
import {useRoute} from '@react-navigation/native';
import {SubjectDetailRouteProp} from '../../types/navigation.types';

const schema = yup
  .object({
    name: yup
      .string()
      .required('Please insert your name')
      .max(20, 'Your name should be 20 charaters or less'),
    teacher: yup
      .number()
      .required('Please insert the number of teachers')
      .min(1, 'Your teacher number should be 1 or higher')
      .max(60, 'Your teacher number should be 60 or less'),
    classroom: yup
      .number()
      .required('Please insert the number of classrooms')
      .min(1, 'Your classroom number should be 1 or higher')
      .max(60, 'Your classroom number should be 60 or less'),
  })
  .required();

const SubjectDetailScreen = () => {
  const route = useRoute<SubjectDetailRouteProp>();
  const subjectData = route.params.subjectData;
  console.log(
    '🚀 ~ file: SubjectDetailScreen.tsx:44 ~ SubjectDetailScreen ~ subjectData',
    subjectData,
  );
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<SubjectType>({
    defaultValues: {
      name: subjectData.name,
      teacher: subjectData.teacher.toString(),
      classroom: subjectData.classroom.toString(),
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const {
    avatar,
    modalVisible,
    setModalVisible,
    handleChoosePhoto,
    handleTakePhoto,
  } = useAvatar(subjectData.avatar);
  const onSubmit: SubmitHandler<SubjectType> = data => {
    console.log(data);
  };
  return (
    <ScrollView style={styles.container}>
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
      <View>
        <Text style={styles.heading}>1. Subject Name</Text>
        <CustomInput
          control={control}
          placeholder="Enter your subject name"
          name="name"
        />
        {errors?.name && (
          <Text style={styles.error}>{errors.name.message}</Text>
        )}
        <Text style={styles.heading}>2. Number of teachers</Text>
        <CustomInput
          control={control}
          placeholder="Enter the number of teachers"
          name="teacher"
          keyboardType="numeric"
        />
        {errors?.teacher && (
          <Text style={styles.error}>{errors.teacher.message}</Text>
        )}
        <Text style={styles.heading}>3. Number of classrooms</Text>
        <CustomInput
          control={control}
          placeholder="Enter the number of classrooms"
          name="classroom"
          keyboardType="numeric"
        />
        {errors?.classroom && (
          <Text style={styles.error}>{errors.classroom.message}</Text>
        )}
      </View>
      <TouchableOpacity
        style={[styles.modalButton, styles.mainButton]}
        onPress={handleSubmit(onSubmit)}>
        <Text style={[styles.modalButtonText]}>Update subject info</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SubjectDetailScreen;

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
