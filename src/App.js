import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]); // Estado para almacenar las tareas
  const [todoEditing, setTodoEditing] = useState(null); // Estado para la tarea que se está editando

  function handleSubmit(e) { // Maneja el envío del formulario para agregar una nueva tarea
    e.preventDefault();

    let todo = document.getElementById('todoAdd').value;
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0) {
        setTodos([...todos].concat(newTodo));
    } else {
        alert("Enter Valid Task");
    }
    document.getElementById('todoAdd').value = ""
  }

  function deleteTodo(id) { // Elimina una tarea de la lista
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) { // Cambia el estado de completado de una tarea
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  useEffect(() => { // Efecto secundario para cargar las tareas almacenadas al montar el componente
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => { // Efecto secundario para guardar las tareas en el almacenamiento local cuando hay cambios
    if(todos.length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);

  function submitEdits(newtodo) { // Envía las ediciones de una tarea
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newtodo.id) {
        todo.text = document.getElementById(newtodo.id).value;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
    }

    return (
        <div id="todo-list">
          <h1>Todo List</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id = 'todoAdd'
            />
            <button type="submit">Add Todo</button>
          </form>
    {todos.map((todo) => (

  <div key={todo.id} className="todo">
    <div className="todo-text">
      <input
        type="checkbox"
        id="completed"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      {todo.id === todoEditing ?
        (<input
          type="text"
          id = {todo.id}
          defaultValue={todo.text}
        />) :
        (<div>{todo.text}</div>)
      }
    </div>
    <div className="todo-actions">
      {todo.id === todoEditing ?
      (
        // Boton de editar
        <button onClick={() => submitEdits(todo)}>Submit Edits</button>
      ) :
      (
        // Boton de subir la edicion
        <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
      )
      // Boton de Eliminar
      }
      <button onClick={() => deleteTodo(todo.id)}>Delete</button> 
     </div>
  </div>
))}
        </div>
      );
    };

export default App;
