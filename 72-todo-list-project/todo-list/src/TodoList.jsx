import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

import { v4 as uuid } from 'uuid';
import { useEffect } from 'react';

// const initialTodos = [
//     { id: uuid(), text: "walk the dog", completed: false },
//     { id: uuid(), text: "feed the cat", completed: true },
//     { id: uuid(), text: "water the plants", completed: false },
//     { id: uuid(), text: "go for a walk", completed: true },
// ]

const getInitialData = () => {
    const data = JSON.parse(localStorage.getItem("todos"));
    if (!data) return [];
    return data;
}

export default function TodoList() {
    const [todos, setTodos] = useState(getInitialData);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos),)
    }, [todos])

    const removeTodo = (id) => {
        setTodos((currentTodos) => (
            currentTodos.filter(todo => todo.id !== id)
        ));
    }

    const addTodo = (text) => {
        setTodos(currentTodos => (
            [...currentTodos, { text: text, id: uuid(), completed: false }]
        ))
    }

    const toggleTodo = (id) => {
        setTodos((currentTodos) => (
            currentTodos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    };
                } else {
                    return todo;
                }
            })
        ));
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: "center",
            m: 3,
        }}>
            <Typography variant="h1" component="h1" sx={{ flexgrow: 1 }}>
                Todo List
            </Typography>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {todos.map((todo) => (
                    < TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />
                ))}
                <TodoForm addTodo={addTodo} />
            </List>
        </Box>
    );
}