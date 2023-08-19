

export default function TodoCard({task,description,completed,id,markAsComplete,deleteTodo}) {

  return (
    <div style={{border: "1px solid black",padding:5,margin: 20}}>

        <h3>{task}</h3>
        <p>{description}</p>

        <button onClick={() => deleteTodo(id)}>Delete</button>

        {completed == true ? <button style={{backgroundColor:"green",color:"white"}} disabled>  Completed </button> :  <button onClick={() => markAsComplete(id)}> Mark as Complete </button> }
   
    </div>
  )
}


