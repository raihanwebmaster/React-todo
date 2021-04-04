import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const list = JSON.parse(sessionStorage.getItem("list"));
    if (list) {
      setTodos(list);
    }
  },[])

  useEffect(() => {
    sessionStorage.setItem('list',JSON.stringify(todos));
  }, [todos])

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const completeTodo = id => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id ) {
        todo.isComplete = !todo.isComplete; 
      }
      return todo; 
    });
    sessionStorage.setItem('list',JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };
  
  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);
    setTodos(removedArr);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
