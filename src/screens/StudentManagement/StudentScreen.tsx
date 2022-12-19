import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {
  resetStudentList,
  setEndList,
  setLoading,
  setRefreshing,
  StudentType,
} from '../../redux/reducers/studentReducer';
import {getListStudent} from '../../redux/thunks/StudentThunk';

const StudentScreen = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const loading = useAppSelector(state => state.student.loading);
  const refreshing = useAppSelector(state => state.student.refreshinng);
  const StudentList = useAppSelector(state => state.student.StudentList);
  const endList = useAppSelector(state => state.student.endList);
  useEffect(() => {
    dispatch(resetStudentList());
    dispatch(getListStudent(1));
  }, [dispatch]);
  const renderItem = ({item}: {item: StudentType}) => (
    <StudentCard data={item} />
  );
  const onRefresh = () => {
    dispatch(setRefreshing(true));
    setCurrentPage(1);
    dispatch(resetStudentList());
    dispatch(getListStudent(1));
    dispatch(setEndList(false));
  };
  const onScroll = () => {
    console.log(loading, endList);
    if (!loading && !endList) {
      dispatch(setLoading(true));
      const newPage = currentPage + 1;
      dispatch(getListStudent(newPage));
      setCurrentPage(newPage);
    }
  };
  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return <ActivityIndicator size="large" color="#ff0000" />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>List Student</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={StudentList}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={renderFooter}
          onEndReached={onScroll}
          onEndReachedThreshold={0}
        />
      </View>
    </View>
  );
};

export default StudentScreen;

const StudentCard = ({data}: {data: StudentType}) => {
  return (
    <View style={styles.cardContainer}>
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
          Age: {data.age}
        </Text>
        <Text numberOfLines={2} style={styles.text}>
          Email: {data.email}
        </Text>
      </View>
    </View>
  );
};

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
  content: {
    flex: 1,
  },
  headingText: {
    fontWeight: '800',
    fontSize: 30,
    color: '#000',
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
  marginBottom10: {
    marginBottom: 10,
  },
  cardContent: {
    flexShrink: 0,
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
});
