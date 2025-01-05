import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import Header from './components/Header'

function App() {

  return (
    <>  
      <Header />
      <Outlet />
    </>
  )
}

export default App
