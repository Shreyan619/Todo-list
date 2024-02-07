import { useState, useEffect } from 'react'
import { TodoProvider } from './context'
import './App.css'
import Todoform from './components/Todoform'
import TodoItem from './components/TodoItem'

function App() {

  // Destructuring is commonly used in function parameters to extract values directly from objects or arrays passed as arguments
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])//array is destructured so that every time settodos update it keeps the old values ....deos not delete old values
    //as todos have 3 values we cannot write setTodos((prev)=>[todo,...prev])
  }

  const updatedTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }  // prevTodo is every element , now prevtodo checks if id is matched with the given id , if id matched todo is updated else prevtodo remains

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const togglecomplete = (id) => {
    //console.log(id);  //used fro checking
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? {
          ...prevTodo,
          completed: !prevTodo.completed
        } : prevTodo))  //here ...prevTodo is taken so that we take all values first and then override it
    //each value could also  be taken but this is an optimised way
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])   //JSON.parse() is a built-in JavaScript method used to parse JSON strings and convert them into JavaScript objects

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])




  return (
    <TodoProvider value={{ todos, addTodo, updatedTodo, deleteTodo, togglecomplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <Todoform />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id}
                className='w-full'
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App


//when we use local storage methods getitem,setitem the data is stored in string method ,so we have convert it into json method to  access it back