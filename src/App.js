import {BrowserRouter, Routes, Route} from 'react-router-dom';
import About from './components/About';
import Users from './components/Users';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <div className='container p-2'>
          <Routes>
            <Route path='/about' Component={About} />
            <Route path='/' Component={Users} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
