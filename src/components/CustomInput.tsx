import React from 'react';
import {useController} from 'react-hook-form';
import {StyleSheet, TextInput, View} from 'react-native';

const CustomInput = ({control, ...props}) => {
  const {
    field: {onChange, onBlur, value},
  } = useController({control, name: props.name});
  return (
    <View style={styles.inputContainer}>
      <TextInput
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        {...props}
        style={styles.input}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 10,
  },
  input: {
    fontSize: 20,
  },
});
