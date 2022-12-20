import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';

export type RootStackParamList = {
  MainTabNavigator: NavigatorScreenParams<MainTabParamList>;
  StudentDetail: undefined;
  AddStudent: undefined;
  SubjectDetail: undefined;
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

export type StudentDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'StudentDetail'
>;

export type AddStudentProps = NativeStackScreenProps<
  RootStackParamList,
  'AddStudent'
>;
export type AddStudentNavigationProp = AddStudentProps['navigation'];

export type SubjectDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'SubjectDetail'
>;

export type AddSubjectProps = NativeStackScreenProps<
  RootStackParamList,
  'AddSubject'
>;
