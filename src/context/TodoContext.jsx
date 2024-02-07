// there is no jsx return here thus it is a js file and not jsx

import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "todos message",
            completed: false
        }
    ],
    addTodo: (todo) => { },
    deleteTodo: (id) => { },
    updatedTodo: (id, todo) => { },
    togglecomplete: (id) => { }
})

export const useTodo = () => {
    return useContext(TodoContext)
}
export const TodoProvider = TodoContext.Provider  //component typically uses React's Context.Provider component to wrap its children, passing down the context value as a prop