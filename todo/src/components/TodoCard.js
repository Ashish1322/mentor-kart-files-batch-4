

export default function TodoCard({task,description}) {
  return (
    <div style={{border: "1px solid black",padding:5,margin: 20}}>

        <h3>{task}</h3>
        <p>{description}</p>

        <button>Delete</button>
        <button> Mark as Complete </button>
    </div>
  )
}


