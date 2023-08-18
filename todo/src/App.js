import {useState,useEffect} from "react"
import './App.css';
import TodoCard from "./components/TodoCard";
function App() {  

  const [todos,setTodos] = useState(null)

  // state to store task and description input values
  const [task,setTaks] = useState("")
  const [description,setDescription] = useState("")

  useEffect(() => {
    let t
    if(localStorage.getItem("todos"))
    {

       t =  JSON.parse(localStorage.getItem('todos'))
    }
    else
    {
      t = []
    }

    setTodos(t)
  },
  [])

  useEffect(() => {
    if(todos != null)
      localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  function addTodo()
  {
    let todo = {
      task: task,
      description: description,
      completed: false
    }
    // [1]
    setTodos([...todos,todo])
  }
  
  const markAsComplete = (id) => {
    var temp = [...todos]
    temp[id].completed = true

    setTodos(temp)
  }

  const deleteTodo = (id) => {
   
    var temp = [...todos]
    temp.splice(id,1)
    setTodos(temp)
  }

  return (
    <div className="App">
      <div style={{border: "1px solid black",padding:5,margin: 20}}>
        <h1>Todo App</h1>
        <input onChange={e => setTaks(e.currentTarget.value) } type="text" placeholder="Enter Task"/>
        <br />
        <input onChange={e => setDescription(e.currentTarget.value)} type="text" placeholder="Enter Description"/>
        <br />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <div >
      {todos && todos.map( (item,index) => 
        <TodoCard deleteTodo={deleteTodo} markAsComplete={markAsComplete} id={index} task={item.task} completed={item.completed} description={item.description} />
      )}
      </div>

    </div>
  );
}

export default App;
