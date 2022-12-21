import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {StudentType, SubjectType} from './data.types';

export type RootStackParamList = {
  MainTabNavigator: NavigatorScreenParams<MainTabParamList>;
  StudentDetail: {studentData: StudentType};
  AddStudent: undefined;
  SubjectDetail: {subjectData: SubjectType};
  AddSubject: undefined;
};

export type MainTabParamList = {
  Student: undefined;
  Subject: undefined;
};

export type StudentProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Student'>,
  NativeStackScreenProps<RootStackParamList>
>;
export type StudentNavigationProp = StudentProps['navigation'];
export type StudentRouteProp = StudentProps['route'];

export type SubjectProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Subject'>,
  NativeStackScreenProps<RootStackParamList>
>;
export type SubjectNavigationProp = SubjectProps['navigation'];
export type SubjectRouteProp = SubjectProps['route'];

export type StudentDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'StudentDetail'
>;
export type StudentDetailNavigationProp = StudentDetailProps['navigation'];
export type StudetnDetailRouteProp = StudentDetailProps['route'];

export type AddStudentProps = NativeStackScreenProps<
  RootStackParamList,
  'AddStudent'
>;
export type AddStudentNavigationProp = AddStudentProps['navigation'];

export type SubjectDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'SubjectDetail'
>;
export type SubjectDetailNavigationProps = SubjectDetailProps['navigation'];
export type SubjectDetailRouteProp = SubjectDetailProps['route'];

export type AddSubjectProps = NativeStackScreenProps<
  RootStackParamList,
  'AddSubject'
>;
export type AddSubjectNavigationProp = AddSubjectProps['navigation'];
export type AddSubjectRouteProp = AddSubjectProps['route'];
