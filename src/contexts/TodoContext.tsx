import { title } from 'process';
import React, { createContext, useEffect, useState } from 'react';
import { Todo } from '../models/Todo';
import { get, save } from '../services/TodoService';
import { TodoContextType } from './TodoContextType';

export const TodoContext = createContext<TodoContextType>({
    todos: [
        { id:1, title: 'Ir ao supermercado', done: true },
        { id:2, title: 'Ir a academia', done: false }
    ],
    addTodo: () => {},
    removeTodo: () => {},
    toggle: () => {}
});

const TodoProvider = (props: any) => {
    const [ todos, setTodos ] = useState<Todo[]>(get);
    
    useEffect(() => {
        save(todos);
    }, [todos]);

    const addTodo = (title: string) => {
        const todo: Todo = { id: todos.length + 1, title: title, done: false };
        
        // let newTodos = todos;
        // newTodos.push(todo);
        // setTodos(newTodos);

        setTodos([...todos, todo]);
    };

    const removeTodo = (todo: Todo) => {
        const index = todos.indexOf(todo);
        setTodos(todos.filter((_, i) => i !== index));
    };

    const toggle = (todo: Todo) => {
        const index = todos.indexOf(todo);
        todos[index].done = !todo.done;
        setTodos([...todos]);
    };

    return(
        <TodoContext.Provider value={{todos, addTodo, removeTodo, toggle}}>
            {props.children}
        </TodoContext.Provider>
    );
}

export default TodoProvider;