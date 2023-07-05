import React,{useState} from 'react';
import { doApiMethod, API_URL, TOKEN_NAME } from '../services/apiService';
import { useNavigate } from 'react-router-dom';


import { useForm } from "react-hook-form";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
export default function Register() {
  const nav = useNavigate();
  
    // const [successful, setSuccessful] = useState();
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();

    
    const onSub = async (bodyData) => {
        delete bodyData.password2;
        let url = API_URL + "/users/"
        console.log(bodyData)
        try {
            await doApiMethod(url, "POST", bodyData)
     nav("/loginn")
        }
        catch(err) {
            console.log(err);
            alert("email already in system try login")
        }


    }

    const login=async(bodyData)=>{
      let url2 = API_URL + "/users/login";
  
        let resp = await doApiMethod(url2, "POST", bodyData);
delete bodyData.name;

localStorage.setItem(TOKEN_NAME, resp.data.token);
        console.log(localStorage[TOKEN_NAME]);
        let info = await doApiMethod(API_URL + "/users/myInfo", "GET", bodyData); 
     
            localStorage.setItem("USER_NAME",JSON.stringify(info.data) );
      
       console.log(info.data);
        console.log(localStorage["USER_NAME"]);
  
        console.log(info.data);
        console.log(info.data.role);
        if (info.data.role == "admin") {
          nav("/admin/addEventAdmin");
        }
        // לשגר לעמוד של רשימת המשתמשים
        else {
          
          nav("/login/allEvents");
        }
        // nav("/allEvents");
        // console.log(resp.data.token.user_id);
      
  
    }


  const nameRef = register("name", { required: true, minLength: 2 });
  const passRef = register("password", { required: true, minLength: 6 });
  const emailRef = register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })
  const pass2Ref = register("password2", {
    required: true, validate: (val) => {
      // בודק אם הערך של טלפון 2 שווה לערך של האינפוט בטלפון 
      return val == getValues("password")
    }
  })



  return (
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-2 mt-2 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Your Name'{...nameRef} id='form1' type='text' className='w-100'/>
              </div>  {errors.name && <div className='text-danger'> * Enter valid name: min 2 chars 
      !!!!</div>}
              

              <div className="d-flex flex-row align-items-center mb-2 mt-2">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput label='Your Email' {...emailRef} id='form2' type='email'/>
               </div> {errors.email && <div className='text-danger'>* Enter valid Email</div>}
              

              <div className="d-flex flex-row align-items-center mb-2 mt-2">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='Password' {...passRef} id='form3' type='password'/>
               </div> {errors.password && <div className='text-danger'>* Enter valid password: min 6 chars</div>}

              

              <div className="d-flex flex-row align-items-center mb-2 mt-2">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput label='Repeat your password' {...pass2Ref} id='form4' type='password'/>
                </div> {errors.password2 && <div className='text-danger'>* password not match</div>}

             

              <div className='mb-4'>
                {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' /> */}
              </div>

              <MDBBtn className='mb-4' size='lg' onClick={handleSubmit(onSub)}>Register</MDBBtn>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}





