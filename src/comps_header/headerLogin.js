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
  const MySwal = withReactContent(Swal)
  const nav = useNavigate();
  const onLogOut = () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "you want to logout ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire(
          'log out!',
          'Your file has been deleted.',
          'success'
        )
        
        // מחיקת טוקן
          localStorage.removeItem(TOKEN_NAME)
          localStorage.removeItem("USER_NAME")
          // להעביר לעמוד לוג אין
          nav("/");
      }
    })
    }
  

  const [checkLogin, setCheckLogin] = useState(false);
  const [init, setInit] = useState({ name: "אורח" });


  
  const check = () => {
    if (localStorage["USER_NAME"] != "") {
      setInit(JSON.parse(localStorage.getItem("USER_NAME")));
      console.log(init);
    }
    if (localStorage.getItem(TOKEN_NAME)) {
      setCheckLogin(true);
     
    }
  };


  useEffect(() => {
    setInit(JSON.parse(localStorage.getItem("USER_NAME")));
    
  },[]);

  const moreInfo = async () => {
    setInit(JSON.parse(localStorage.getItem("USER_NAME")));
   
console.log(init._id);
    nav("/login/privateArea")
  };

  return (
    <nav>
      <ul className="navbar">
      
     
        
          <button className="btn" ><a href="/login/allEvents">הוסף אירוע</a></button>
          <button className="btn" onClick={onLogOut}>התנתק</button>
          <button className= "btn" onClick={()=>moreInfo()}>איזור אישי</button>
          <div className="profile-picture ms-2">{init?.name.charAt(0)}</div>
        
          
      </ul>
    </nav>
  );
}

export default function HeaderLogin() {
  
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
