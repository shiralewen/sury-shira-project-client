import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "./header.css";
import { TOKEN_NAME } from "../services/apiService";
// import {Swal} from "sweetalert2";

function Logo() {
  return (
    <div>
      <a href="#">
        <div className="logo-wrap">
          <div id="logo" className="logo" alt="Brand logo">
            Meeting
          </div>
        </div>
      </a>
    </div>
  );
}




function Navbar() {


  useEffect(() => {
  
    
  },[]);



  return (
    <nav>
      <ul className="navbar">

          <div>
          <button className="btn"><a href="/loginn">התחבר</a></button>
          <button className="btn"><a href="/register">הרשמה</a></button>
          </div>
       
      </ul>
    </nav>
  );
}

export default function Header() {
  
  return (
    <header>
      <div className="h-container">
        <Logo />
        <Navbar />
      </div>
    </header>
    
  );
}

// function App() {
//   return (
//     <div>
//       <Header />
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById('root'));
