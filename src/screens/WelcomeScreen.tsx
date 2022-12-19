import {View, Text, Button} from 'react-native';
import React, {useEffect, useState} from 'react';

interface Data {
  text: string;
}

const WelcomeScreen = () => {
  const [data, setData] = useState<Data | null>(null);
  console.log('🚀 ~ file: WelcomeScreen.tsx:10 ~ WelcomeScreen ~ data', data);
  useEffect(() => {
    fetch('https://6385a825875ca3273d41aa9e.mockapi.io/api/v1/posts')
      .then(res => res.json())
      .then(result => setData(result));
  }, []);
  return (
    <View>
      <Text>WelcomeScreen</Text>
      <List
        items={['HTML', 'CSS', 'Javascript', 'Typescript']}
        handleClick={(item: string) => console.log(item)}
      />
      <Boxed>
        <Text>Hello world</Text>
      </Boxed>
    </View>
  );
};

const List = ({
  items,
  handleClick,
}: {
  items: string[];
  handleClick?: (item: string) => void;
}) => {
  return (
    <View>
      {items.map(item => (
        <Button title={item} key={item} onPress={() => handleClick?.(item)} />
      ))}
    </View>
  );
};

const Boxed = ({children}: {children?: React.ReactNode}) => {
  return <View>{children}</View>;
};

export default WelcomeScreen;
