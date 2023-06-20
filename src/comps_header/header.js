import './header.css';

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
  return (
    <nav>
      <ul className="navbar">
        {/* <li><a href="#">Products</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li> */}
        
        <button className="btn"><a href="/login">Log In</a></button>
        <button className="btn"><a href="/register">Sign Up</a></button>
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