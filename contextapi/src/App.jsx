import { useState } from 'react'

import './App.css'
import CountContext from './CountContext'
import FooterContext from './FooterContext'
import Count from './components/Count'
import Footer from './components/Footer'

function App() {

  const [count,setCount] = useState(0)

  const increment = () => {
    setCount(count+1)
  }

  const decrement = () => {
    setCount(count-1)
  } 

  const [footerValues, setFooterValue] = useState("ABC Pvt. Ltd")

  return (
    <div>
    <CountContext.Provider value={{count,increment,decrement}}>
      <FooterContext.Provider value={{footerValues}}>
        <Count />
        <Footer />
      </FooterContext.Provider>
    </CountContext.Provider>

 
    
    
   

    </div>
   

  )
}

export default App
