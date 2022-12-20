import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SubjectScreen from '../screens/StudentManagement/SubjectScreen';
import {MainTabParamList} from '../types/navigation.type';
import StudentStackNavigator from './StudentStackNavigator';

const BottomTab = ({
  focused,
  route,
}: {
  focused: boolean;
  route: RouteProp<MainTabParamList, keyof MainTabParamList>;
}) => {
  const ref = useRef<Lottie>(null);
  let path;
  let iconStyle = styles.icon;
  if (route.name === 'Home') {
    path = require('../assets/LottieFile/home.json');
    if (focused) {
      ref.current?.play();
    }
  } else if (route.name === 'User') {
    path = require('../assets/LottieFile/user.json');
    if (focused) {
      ref.current?.play();
    }
  }
  return (
    <Lottie
      ref={ref}
      autoPlay={false}
      loop={false}
      source={path}
      style={iconStyle}
    />
  );
};

const BottomIconTab = ({
  focused,
  route,
}: {
  focused: boolean;
  route: RouteProp<MainTabParamList, keyof MainTabParamList>;
}) => {
  let iconName: string = '';
  let iconColor: string = '#000';
  if (route.name === 'StudentStack') {
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
      initialRouteName="StudentStack"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          // return <BottomTab focused={focused} route={route} />;
          return <BottomIconTab focused={focused} route={route} />;
        },
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        headerShown: false,
      })}>
      <Tab.Screen name="StudentStack" component={StudentStackNavigator} />
      <Tab.Screen name="Subject" component={SubjectScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
