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
        style={styles.input}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
