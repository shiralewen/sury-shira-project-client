import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { doApiMethod, API_URL, TOKEN_NAME } from "../services/apiService";
import React from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const nav = useNavigate();

  const onSubForm = (bodyData) => {
    // data -> מכיל את כל המאפיינים שלה השמות של האינפוטים עם הערך שלהם
    console.log(bodyData);
    doApiForm(bodyData);
  };

  const doApiForm = async (bodyData) => {
    let url = API_URL + "/users/login";
    try {
      let resp = await doApiMethod(url, "POST", bodyData);
 
      localStorage.setItem(TOKEN_NAME, resp.data.token);
      console.log(localStorage[TOKEN_NAME]);
      let info = await doApiMethod(API_URL + "/users/myInfo", "GET", bodyData); 
      try{
          localStorage.setItem("USER_NAME",JSON.stringify(info.data) );
      }
    catch{
      console.log("lllll")
    }
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
    } catch (err) {
      console.log(err.response);
      alert("User or password worng, or service down");
    }
  };

  let emailRef = register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  });

  let passwordRef = register("password", { required: true, minLength: 3 });

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col="4" md="4">
          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0"></p>
          </div>

          <MDBInput
            autoFocus
            wrapperClass="mb-4"
            {...emailRef}
            label="Email address"
            id="formControlLg"
            type="email"
            size="lg"
          />
          {errors.email && <div className="text-danger">Enter valid email</div>}
          <MDBInput
            wrapperClass="mb-4"
            {...passwordRef}
            label="Password"
            id="formControlLg"
            type="password"
            size="lg"
            autoFocus

          />
          {errors.password && (
            <div className="text-danger">Enter min 3 charts password</div>
          )}

          {/* <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div> */}

          <div className="text-center text-md-start mt-4 pt-2">
            <MDBBtn
              className="mb-0 px-5"
              size="lg"
              onClick={handleSubmit(onSubForm)}
            >
              Login
            </MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2 mt-3">
              Don't have an account?{" "}
              <a href="/register" className="link-danger">
                Register
              </a>
            </p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

    
  );
}
