import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AddStudentScreen from '../screens/StudentManagement/AddStudentScreen';
import AddSubjectScreen from '../screens/StudentManagement/AddSubjectScreen';
import StudentDetailScreen from '../screens/StudentManagement/StudentDetailScreen';
import SubjectDetailScreen from '../screens/StudentManagement/SubjectDetailScreen';
import {RootStackParamList} from '../types/navigation.types';
import MainTabNavigator from './MainTabNavigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName="MainTabNavigator"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      <RootStack.Screen name="StudentDetail" component={StudentDetailScreen} />
      <RootStack.Screen name="AddStudent" component={AddStudentScreen} />
      <RootStack.Screen name="SubjectDetail" component={SubjectDetailScreen} />
      <RootStack.Screen name="AddSubject" component={AddSubjectScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
