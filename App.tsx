import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import {store} from './src/redux/store';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <MainTabNavigator />
        </SafeAreaView>
      </Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
