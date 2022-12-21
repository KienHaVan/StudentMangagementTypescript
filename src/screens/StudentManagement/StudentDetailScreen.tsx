import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import SubjectAPI from '../../api/SubjectAPI';
import CustomInput from '../../components/CustomInput';
import TopBackButton from '../../components/TopBackButton';
import useAvatar from '../../hooks/useAvatar';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {
  enrollASubject,
  initSubjectsBeforeUpdate,
  unenrollASubject,
} from '../../redux/reducers/studentReducer';
import {updateCurrentStudent} from '../../redux/thunks/StudentThunk';
import {
  getListSubject,
  updateStudentEnrolled,
} from '../../redux/thunks/SubjectThunk';
import {StudentType, SubjectType} from '../../types/data.types';
import {
  StudentDetailNavigationProp,
  StudetnDetailRouteProp,
} from '../../types/navigation.types';

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
  const navigation = useNavigation<StudentDetailNavigationProp>();
  const dispatch = useAppDispatch();
  const route = useRoute<StudetnDetailRouteProp>();
  const studentData = route.params.studentData;
  const SubjectList = useAppSelector(state => state.subject.SubjectList);
  const enrolledSubjects = useAppSelector(
    state => state.student.enrolledSubjects,
  );
  console.log('studentData.subjects', studentData.subjects);

  useEffect(() => {
    dispatch(getListSubject());
    dispatch(initSubjectsBeforeUpdate(studentData.subjects));
  }, [dispatch, studentData.subjects]);
  const {
    avatar,
    modalVisible,
    setModalVisible,
    handleChoosePhoto,
    handleTakePhoto,
  } = useAvatar(studentData.avatar);
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<StudentType>({
    defaultValues: {
      name: studentData.name,
      age: studentData.age.toString(),
      email: studentData.email,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<StudentType> = data => {
    const updateData: StudentType = {
      avatar,
      name: data.name,
      age: data.age,
      email: data.email,
      createdAt: studentData.createdAt,
      subjects: enrolledSubjects,
      id: studentData.id,
    };
    enrolledSubjects.map(item => {
      SubjectAPI.getASubject(item.id!)
        .then(res => res.data)
        .then(subjectData => {
          dispatch(
            updateStudentEnrolled({
              id: item.id!,
              studentList: [
                ...subjectData.students,
                {
                  avatar,
                  name: data.name,
                  age: data.age,
                  email: data.email,
                  createdAt: studentData.createdAt,
                  id: studentData.id,
                },
              ],
            }),
          );
        });
    });
    dispatch(updateCurrentStudent({id: studentData.id!, data: updateData}));
    navigation.goBack();
  };
  const handleEnrollASubject = (item: SubjectType) => {
    dispatch(enrollASubject(item));
  };
  const handleUnenrollASubject = (item: SubjectType) => {
    dispatch(unenrollASubject(item));
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
        />
        {errors?.age && <Text style={styles.error}>{errors.age.message}</Text>}
        <Text style={styles.heading}>3. Email</Text>
        <CustomInput
          control={control}
          placeholder="Enter your email"
          name="email"
        />
        {errors?.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
        <Text style={styles.heading}>4. Subject Enroll</Text>
        {SubjectList.map(item => (
          <SubjectCard
            key={item.id}
            data={item}
            defaultEnrolled={enrolledSubjects}
            handleEnrollASubject={() => handleEnrollASubject(item)}
            handleUnenrollASubject={() => handleUnenrollASubject(item)}
          />
        ))}
      </View>
      <TouchableOpacity
        style={[styles.modalButton, styles.mainButton]}
        onPress={handleSubmit(onSubmit)}>
        <Text style={[styles.modalButtonText]}>Update student info</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const SubjectCard = ({
  data,
  defaultEnrolled,
  handleEnrollASubject,
  handleUnenrollASubject,
}: {
  data: SubjectType;
  defaultEnrolled?: (SubjectType | undefined)[];
  handleEnrollASubject: () => void;
  handleUnenrollASubject: () => void;
}) => {
  const [enrollState, setEnrollState] = useState(false);
  useEffect(() => {
    if (defaultEnrolled?.length! > 0) {
      defaultEnrolled?.map(item => {
        if (item?.id === data.id) {
          setEnrollState(true);
        }
      });
    }
  }, [data.id, defaultEnrolled]);
  const onUnenrollASubject = () => {
    handleUnenrollASubject();
    setEnrollState(false);
  };
  return (
    <View style={styles.subjectCard}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{
            uri: data.avatar,
          }}
          style={{width: 36, height: 36, borderRadius: 1000, marginRight: 10}}
        />
        <Text style={[styles.modalButtonText, {color: '#000'}]}>
          {data.name}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.modalButton,
          enrollState ? styles.unenrollButton : styles.enrollButton,
        ]}
        onPress={enrollState ? onUnenrollASubject : handleEnrollASubject}>
        <Text style={styles.modalButtonText}>
          {enrollState ? 'Unenroll' : 'Enroll'}
        </Text>
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
  subjectCard: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  enrollButton: {
    width: 100,
    marginBottom: 0,
    backgroundColor: '#28a745',
  },
  unenrollButton: {
    width: 100,
    marginBottom: 0,
  },
});
