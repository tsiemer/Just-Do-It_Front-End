import { Route, Routes } from 'react-router-dom';
import './index.css'
import Home from './pages/home';
import Signup from './pages/signup';
import Navigation from './components/navigation';

function App() {
  return (
    <div>
      <Navigation/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App
