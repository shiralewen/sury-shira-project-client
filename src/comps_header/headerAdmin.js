import { useNavigate } from 'react-router-dom';
import './header.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { TOKEN_NAME } from "../services/apiService";
import { useEffect, useState } from 'react';
function Logo() {

  return (
    <div>
      <a href="#">
        <div className="logo-wrap">
          <div 
            id="logo" 
            className='logo' 
            alt="Brand logo"
            >
            Meeting
          </div>
        </div>
      </a> 
    </div>
  );
}



function Navbar() {
  const nav = useNavigate();

  const [init, setInit] = useState({ name: "אורח" });

  
  useEffect(() => {
    setInit(JSON.parse(localStorage.getItem("USER_NAME")));
    
  },[]);
  
  
  const onLogOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "you want to logout ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'log out!',
          'Your file has been deleted.',
          'success'
        )
        
        // מחיקת טוקן
          localStorage.removeItem(TOKEN_NAME)
          // להעביר לעמוד לוג אין
          nav("/");
      }
    })
    }

    
  return (
    <nav>
      <ul className="navbar">
      <button className="btn" onClick={onLogOut}>התנתק</button>
      <div className="profile-picture ms-2">{init?.name.charAt(0)}</div>
        {/* <li><a className='addAdmin' href="/admin/addEventAdmin">הוסף אירוע</a></li> */}
        {/* <li><a href="#">Services</a></li> */}
       
        
        {/* <button className="btn"><a href="/login">Log In</a></button>
        <button className="btn"><a href="/register">Sign Up</a></button> */}
      </ul>
    </nav>
  );
}

export default function HeaderAdmin() {
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