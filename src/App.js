import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './comps_header/login';
import Header from './comps_header/header';
import Register from './comps_header/register';
import PrivateArea from './comps_header/privateArea';
import AllEvents from './comps_header/allEvents';
// import { doApiMethod, API_URL, TOKEN_NAME } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from './comps_header/headerAdmin';
import AddEventAdmin from './admin/addEventAdmin';
import CreateMission from './comps_header/createMission';
import TheBigMission from './comps_header/theBigMission';
import { useState } from 'react';
import HeaderLogin from './comps_header/headerLogin';


function App() {
  const [item2,setItem2]=useState();
const create=(item)=>{
 setItem2=item;
}

  return (
    
    <BrowserRouter>
    <div id="root"></div>
    {/* <AddEve/ntAdmin/> */}
    <Routes>
        <Route path="/*" element={<Header />} />
        <Route path="/admin/*" element={<HeaderAdmin />} />
        <Route path="/login/*" element={<HeaderLogin />} />
        
        </Routes>  
      <Routes>
      {/* <Route path="/" element={<Home />}/> */}
        <Route path="/" element={<Login />} />
        <Route path="/loginn" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login/privateArea" element={<PrivateArea />} />
        <Route path="/login/allEvents" element={<AllEvents />} />
        <Route path="/login/theBigMission/:idMission" element={<TheBigMission />} />
        <Route path="admin/allEvents" create={create} element={<AllEvents />} />
        <Route path="/admin/addEventAdmin" element={<AddEventAdmin />} />
        <Route path="/login/createMission/:idEvent" element={<CreateMission />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
