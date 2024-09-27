
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './pages/login';
import './pages/signup';
import './pages/todo';
import Todo  from './pages/todo';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Todo/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </Router>

  )
}

export default App
