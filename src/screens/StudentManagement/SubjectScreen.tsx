import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {
  resetSubjectList,
  setRefreshing,
} from '../../redux/reducers/subjectReducer';
import {getListSubject} from '../../redux/thunks/SubjectThunk';
import {SubjectType} from '../../types/data.types';
import {SubjectNavigationProp} from '../../types/navigation.types';

const SubjectScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<SubjectNavigationProp>();
  const SubjectList = useAppSelector(state => state.subject.SubjectList);
  const refreshing = useAppSelector(state => state.subject.refreshing);
  useEffect(() => {
    dispatch(getListSubject());
  }, [dispatch]);
  const onRefresh = () => {
    dispatch(setRefreshing(true));
    dispatch(resetSubjectList());
    dispatch(getListSubject());
  };
  const renderItem = ({item}: {item: SubjectType}) => {
    return <SubjectCard data={item} />;
  };
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>List Subject</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={SubjectList}
          keyExtractor={item => item.id || item.avatar}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddSubject')}>
        <Text style={[styles.headingText, styles.textWhite]}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    paddingVertical: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 20,
  },
  headingText: {
    fontWeight: '800',
    fontSize: 30,
    color: '#000',
  },
  content: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  cardImage: {
    width: 150,
    height: 150,
    borderRadius: 1000,
    marginRight: 20,
  },
  cardContent: {
    flexShrink: 0,
    flex: 1,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
  textWhite: {
    color: '#fff',
  },
  addButton: {
    width: 70,
    height: 70,
    backgroundColor: '#dc3545',
    borderRadius: 1000,
    elevation: 10,
    position: 'absolute',
    right: 20,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SubjectCard = ({data}: {data: SubjectType}) => {
  const navigation = useNavigation<SubjectNavigationProp>();
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('SubjectDetail')}>
      <Image
        source={{
          uri: data.avatar,
        }}
        resizeMode="cover"
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <Text style={[styles.headingText, styles.marginBottom10]}>
          {data.name}
        </Text>
        <Text style={[styles.text, styles.marginBottom10]}>
          Num of teacher: {data.teacher}
        </Text>
        <Text numberOfLines={2} style={styles.text}>
          Num of classroom: {data.classroom}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
