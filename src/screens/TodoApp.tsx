import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useTodos, {Todo} from '../hooks/useTodos';

const initialState: Todo[] = [];

const TodoApp = () => {
  const {todos, task, setTask, onAddTodo, onRemoveTodo} =
    useTodos(initialState);
  return (
    <View style={styles.container}>
      <Heading title="Todo List" />
      <View style={styles.AddTask}>
        <TextInput
          placeholder="Enter the task..."
          style={styles.TaskInput}
          onChangeText={newTask => setTask(newTask)}
          value={task}
        />
        <TouchableOpacity style={styles.AddTaskButton} onPress={onAddTodo}>
          <Text style={styles.AddTaskButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {todos.map(todo => (
          <View style={styles.AddTask} key={todo.id}>
            <Text style={[styles.heading, {marginBottom: 0}]}>{todo.text}</Text>
            <TouchableOpacity
              style={[styles.AddTaskButton, {backgroundColor: '#dc3545'}]}
              onPress={() => onRemoveTodo(todo.id)}>
              <Text style={styles.AddTaskButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView> */}
      <RenderList
        items={todos}
        render={item => (
          <View style={styles.AddTask} key={item.id}>
            <Text style={[styles.heading, {marginBottom: 0}]}>{item.text}</Text>
            <TouchableOpacity
              style={[styles.AddTaskButton, {backgroundColor: '#dc3545'}]}
              onPress={() => onRemoveTodo(item.id)}>
              <Text style={styles.AddTaskButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const Heading = ({title}: {title?: string}) => {
  return (
    <View>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );
};

const RenderList = <T,>({
  items,
  render,
}: {
  items: T[];
  render: (item: T) => React.ReactNode;
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {items.map(item => render(item))}
    </ScrollView>
  );
};

export default TodoApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  heading: {
    color: '#000',
    fontSize: 32,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  AddTask: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  TaskInput: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#eee',
    paddingHorizontal: 20,
  },
  AddTaskButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 8,
    marginLeft: 8,
    color: '#fff',
  },
  AddTaskButtonText: {
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 20,
    color: '#fff',
  },
});
