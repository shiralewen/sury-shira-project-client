import React from 'react';
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
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();

const onSub = (dataBody) => {
    
    delete dataBody.pass2Ref;
    console.log(dataBody);
  }

  // register -> פונקציה שמייצר לנו ריף עם וולדזציה לאינפוט מסויים
  const nameRef = register("name", { required: true, minLength: 4 });
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

              <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-2 mt-2 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Your Name'{...nameRef} id='form1' type='text' className='w-100'/>
              </div>  {errors.name && <div className='text-danger'> * Enter valid name: min 4 chars 
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





