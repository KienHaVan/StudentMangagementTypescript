import {useReducer, useState} from 'react';

type ActionType = {type: 'ADD'; text: string} | {type: 'REMOVE'; id: number};
export interface Todo {
  id: number;
  text: string;
}

const todoReducer = (state: Todo[], action: ActionType) => {
  switch (action.type) {
    case 'ADD':
      return [...state, {id: state.length, text: action.text}];
    case 'REMOVE':
      return state.filter((todo: Todo) => todo.id !== action.id);
    default:
      // throw new Error('');
      return state;
  }
};

export default function useTodos(initialState: Todo[]): {
  todos: Todo[];
  task: string;
  setTask: (task: string) => void;
  onAddTodo: () => void;
  onRemoveTodo: (todoId: number) => void;
} {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [task, setTask] = useState('');

  const onRemoveTodo = (todoId: number) => {
    dispatch({
      type: 'REMOVE',
      id: todoId,
    });
  };
  const onAddTodo = () => {
    if (task) {
      dispatch({
        type: 'ADD',
        text: task,
      });
      setTask('');
    }
  };
  return {
    todos,
    task,
    setTask,
    onRemoveTodo,
    onAddTodo,
  };
}
