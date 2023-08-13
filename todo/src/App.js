import {useState} from "react"
import './App.css';
import TodoCard from "./components/TodoCard";
function App() {  

  const [todos,setTodos] =useState([])
  // state to store task and description input values
  const [task,setTaks] = useState("")
  const [description,setDescription] = useState("")




  return (
    <div className="App">
      <div style={{border: "1px solid black",padding:5,margin: 20}}>
        <h1>Todo App</h1>
        <input onChange={e => setTaks(e.currentTarget.value) } type="text" placeholder="Enter Task"/>
        <br />
        <input onChange={e => setDescription(e.currentTarget.value)} type="text" placeholder="Enter Description"/>
        <br />
        <button>Add Todo</button>
      </div>

      <div >
      {todos.map(item => 
        <TodoCard task={item.task} description={item.description} />
      )}
      </div>

    </div>
  );
}

export default App;
