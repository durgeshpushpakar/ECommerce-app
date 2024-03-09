import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import Register from './pages/Auth/Register';
import PageNotFound from './pages/PageNotFound';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;