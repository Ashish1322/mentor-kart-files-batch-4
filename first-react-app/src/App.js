import logo from './logo.svg';
import "./app.css"
import Nav from "./components/Navs"
import Footer from './components/Footer';
import Home from './components/Home';
import CanDrive from './components/CanDrive';

function App() {
  
  
  return (

   <div>
    <Nav bgcolor="#d5d5d5" />
    <Home />
    <CanDrive age={2} />
    <CanDrive age={50} />
    <Footer />

   </div>
    
  );
}

export default App;
