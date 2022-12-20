import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import StudentScreen from '../screens/StudentManagement/StudentScreen';
import SubjectScreen from '../screens/StudentManagement/SubjectScreen';
import {MainTabParamList} from '../types/navigation.types';

const BottomIconTab = ({
  focused,
  route,
}: {
  focused: boolean;
  route: RouteProp<MainTabParamList, keyof MainTabParamList>;
}) => {
  let iconName: string = '';
  let iconColor: string = '#000';
  if (route.name === 'Student') {
    iconName = 'user';
    if (focused) {
      iconColor = '#dc3545';
    }
  } else if (route.name === 'Subject') {
    iconName = 'folder';
    if (focused) {
      iconColor = '#dc3545';
    }
  }
  return <Icon name={iconName} size={24} color={iconColor} />;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Student"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          // return <BottomTab focused={focused} route={route} />;
          return <BottomIconTab focused={focused} route={route} />;
        },
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        headerShown: false,
      })}>
      <Tab.Screen name="Student" component={StudentScreen} />
      <Tab.Screen name="Subject" component={SubjectScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
