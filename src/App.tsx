import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import Navbar from './components/Navbar';
import { ShoppingCartProvider } from './context/ShoppingCartContext';

type Props = {};

const App = (props: Props) => {
  return (
    <>
      <ShoppingCartProvider>
        <Navbar />
        <div className='flex justify-center items-center mx-0 '>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/store' element={<Store />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
      </ShoppingCartProvider>
    </>
  );
};

export default App;
