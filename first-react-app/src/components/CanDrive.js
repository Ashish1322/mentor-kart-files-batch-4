

export default function CanDrive({age}) {

    
  return (
    <div>
       {age <=18 ? <h1>User cannot drive</h1> : <h1>User can drive</h1>}
      
    </div>
  )
}
