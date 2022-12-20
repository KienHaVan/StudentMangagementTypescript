import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
export type StudentStackParamList = {
  Student: undefined;
  StudentDetail: undefined;
  AddStudent: undefined;
};

export type MainTabParamList = {
  StudentStack: NavigatorScreenParams<StudentStackParamList>;
  Subject: undefined;
};

export type StudentScreenProps = NativeStackScreenProps<
  StudentStackParamList,
  'Student'
>;

export type StudentNavigationProp = StudentScreenProps['navigation'];
