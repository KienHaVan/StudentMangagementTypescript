import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Counter = () => {
  const [count, setCount] = useState(0);
  const handleDecrease = () => {
    setCount(count - 1);
  };
  const handleIncrease = () => {
    setCount(count + 1);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDecrease}>
        <Text style={styles.textButton}>-</Text>
      </TouchableOpacity>
      <View style={styles.textView}>
        <Text style={styles.text}>{count}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleIncrease}>
        <Text style={styles.textButton}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
    marginHorizontal: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 1000,
  },
  textButton: {
    color: '#fff',
    fontSize: 32,
  },
  textView: {
    width: 100,
  },
  text: {
    alignSelf: 'center',
    fontSize: 40,
  },
});
