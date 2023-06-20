
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './comps_header/login';
import Header from './comps_header/header';
import Register from './comps_header/register';

function App() {
  return (
    
    <BrowserRouter>
    <div id="root"></div>

      <Header/>
      {/* <Routes>
        <Route path="/admin/*" element={<HeaderAdmin />} />
      </Routes> */}    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
