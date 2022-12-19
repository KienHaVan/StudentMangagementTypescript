import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AddStudentScreen from '../screens/StudentManagement/AddStudentScreen';
import StudentDetailScreen from '../screens/StudentManagement/StudentDetailScreen';
import StudentScreen from '../screens/StudentManagement/StudentScreen';

type StudentStackParamList = {
  Student: undefined;
  StudentDetail: undefined;
  AddStudent: undefined;
};

const StudentStack = createNativeStackNavigator<StudentStackParamList>();

const StudentStackNavigator = () => {
  return (
    <StudentStack.Navigator
      initialRouteName="Student"
      screenOptions={{headerShown: false}}>
      <StudentStack.Screen name="Student" component={StudentScreen} />
      <StudentStack.Screen
        name="StudentDetail"
        component={StudentDetailScreen}
      />
      <StudentStack.Screen name="AddStudent" component={AddStudentScreen} />
    </StudentStack.Navigator>
  );
};

export default StudentStackNavigator;
